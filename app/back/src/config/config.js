'use strict'

const config = {
    application: {
        host: 'localhost',
        port: process.env.NODE_PORT || 3000,
        protocol: 'http'
    },
    client: {
        host: 'localhost',
        port: 8080,
        protocol: 'http'
    },
    database: {
        name: 'xxx',
        host: 'xxx'
    },
    mail: {
        from: 'xxx',
        service: 'xxx'
    },
    omDB: {
        host: 'http://www.omdbapi.com/'
    },
    openSubtitles: {
        username: 'xxx'
    },
    oauth: {
        '42': {
            auth: {
                redirectURI: 'http://localhost:8080/oauth/42/',
                tokenHost: 'https://api.intra.42.fr/'
            },
            client: {
                id: 'xxx'
            },
            url: 'https://api.intra.42.fr/v2/me'
        },
        'FB': {
            auth: {
                redirectURI: 'http://localhost:3000/auth/facebook/callback'
            },
            client: {
                id: 'xxx'
            }
        },
        'Google': {
            auth: {
                redirectURI: 'http://localhost:3000/auth/google/callback'
            },
            client: {
                id: 'xxx'
            }
        },
        'Github': {
            auth: {
                redirectURI: 'http://localhost:3000/auth/github/callback'
            },
            client: {
                id: 'xxx'
            }
        },
        'Instagram': {
            client: {
                id: 'xxx'
            }
        }
    },
    prettyLog: process.env.NODE_ENV == 'development'
}
module.exports = config