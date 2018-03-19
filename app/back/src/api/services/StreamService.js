'use strict'

import ffmpeg from 'fluent-ffmpeg'
import ts from 'torrent-stream'
import md5 from 'md5'
import pump from 'pump'

const isStreamable = (fileName) => {
    const mimes = [ '.*[.]{1}mp4', '.*[.]{1}avi', '.*[.]{1}mkv' ]


    return fileName.match(new RegExp('(' + mimes.join('|') + ')'))
}

const mustBeConverted = (fileName) => {
    const mimes = [ '.*[.]{1}avi', '.*[.]{1}mkv' ]

    return fileName.match(new RegExp('(' + mimes.join('|') + ')'))
}


function checkTorrentStatus(engine) {
    let total = 0

    console.log('Checking torrents...', engine.files)
    engine.files.forEach((file) => {
        total += parseInt(file.length)

        if (total === engine.swarm.downloaded)
            console.log('Torrent fully downloaded')
    })
}

export const initConversionStreaming = (req, res, engine, file, path) => {
    const stream = file.createReadStream()

    console.log('Streaming[Conversion]: initialized')
    console.log('Streaming[Conversion]: path: ', path + '/' + file.name)
    res.on('close', () => {
        console.log('Streaming[Conversion]: (response stream) closed')
    })
    res.writeHead(200, {
        'Cache-Control': 'no-cache, no-store',
        'Content-Length': file.length,
        'Content-Type': 'video/webm'
    })
    const conversion = ffmpeg(stream)
        .on('error', function(err) {
            console.log('Streaming[Conversion]: error:', err)
        })
        .audioBitrate(128)
        .audioCodec('libvorbis')
        .format('webm')
        .outputOptions([
            '-cpu-used 2',
            '-deadline realtime',
            '-error-resilient 1',
            '-threads 4'
        ])
        .videoBitrate(1024)
        .videoCodec('libvpx')
        .on('end', () => {
            console.log('Streaming[Conversion]: finished')
        })

    pump(conversion, res)
}

export const initStandardStreaming = (req, res, engine, file) => {
    const stream = file.createReadStream()

    console.log('Streaming[Standard]: initialized')
    res.on('close', () => {
        console.log('Streaming[Standard]: closed')
        engine.remove(true, () => { console.log('Engine cleared') } )
        engine.destroy()
    })
    res.writeHead(200, {
        'Cache-Control': 'no-cache, no-store',
        'Content-Length': file.length,
        'Content-Type': 'video/mp4'
    })
    stream.pipe(res)
}

export const processStandardStreaming = (req, res, engine, file, range) => {
    const parts = (range) ? range.replace(/bytes=/, '').split('-') : null
    const start = (parts) ? parseInt(parts[0], 10) : 0
    const end = (parts && parts[1]) ? parseInt(parts[1], 10) : file.length - 1

    const stream = file.createReadStream({ start, end })

    res.on('close', () => {
        engine.remove(true, () => { console.log('Engine cleared') } )
        engine.destroy()
        console.log('Streaming[Standard]: closed')
    })
    res.writeHead(206, {
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'no-cache, no-store',
        'Content-Range': `bytes ${start}-${end}/${file.length}`,
        'Content-Length': parseInt(end - start) + 1,
        'Content-Type': 'video/mp4'
    })
    stream.pipe(res)
}

export const initStreaming = (req, res, magnet, options) => {
    const engine = ts(magnet, options)
    const { range } = req.headers

    console.log('Initialization range: ', range)
    engine.on('ready', function () {
        const files = engine.files
        let isStreaming = false
        let toStream = null

        files.forEach((file, index) => {

            if (index === 0) {
                toStream = file
            }
            else {
                if (toStream && file.length > toStream.length) {
                    toStream = file
                }
                if (index === files.length - 1) {
                    console.log('-> File name: ', toStream.name)
                    console.log('-> File path: ', options.path)

                    if (!isStreaming && isStreamable(toStream.name) !== null) {
                        isStreaming = true

                        if (mustBeConverted(toStream.name))
                            initConversionStreaming(req, res, engine, toStream, options.path)
                        else {
                            processStandardStreaming(req, res, engine, toStream, range)
                        }
                    }
                    else {
                        file.select()
                    }
                }
            }
        })
    })
    engine.on('torrent', () => {
        checkTorrentStatus(engine)
    })
}

export const streamingHandler = async (req, res) => {
    const { magnet } = req.params

    try {
        const buf = new Buffer(magnet, 'base64')
        const decoded = buf.toString()
        const path = `./files/${md5(decoded)}`
        const options = {
            connections: 100,
            uploads: 10,
            tmp: './files/cache',
            path: path,
            dht: true,
            verify: true,
            tracker: true
        }

        if (decoded && decoded.match(new RegExp(/^(magnet:\?xt=urn:btih:).*?$/))) {
            initStreaming(req, res, decoded, options)
        } else {
            return res.sendStatus(204)
        }
    }
    catch (err) {
        return res.sendStatus(203)
    }
}