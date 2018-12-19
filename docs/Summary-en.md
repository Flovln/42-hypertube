# 42-hypertube

## Required specifications

- Server
  - Built-in Web-Server
- Compatibilies
  - Firefox (V. 41+)
  - Chrome (V. 46+)
- Responsiveness on mobile resolutions
  - Yes
- Minimal structure
  - Header
  - Footer
- Locales/Languages to handle
  - English (Default)
  - French

### Prohibited modules

- webtorrent
- pulsar
- peerflix

### User restricted features access (needing authentication)
  - Library
  - Search
  - Video player
  - Users public profiles 
  - User account editing
  - User public profile editing

## Required fonctionnalities

### User experience

- OmniAuth (Registering + Connexion)
  - 2 Strategies minimum
    - School 42 - mandatory
    - Facebook
    - Google
    - Github
    - Instagram
- [x] Registering
  - E-mail
  - Login
  - Profile picture
  - Last name
  - First name
  - Secured password
- [x] Login
  - Login
  - Password
- [x] Password reinitialisation
  - Email
- [x] Profil editing
  - Profil picture
  - Last name
  - First name
- [x] Account editing
  - Email
  - Last name
  - Password
- [x] Public profile
  - Profile picture
  - Last name
  - First name

### Library

- Search field
  - Requirement
    - 2 external torrent sources minimum
      - Yify
      - Pirate Bay
    - Restrict file format videos only
- Thumbnails
  - Behavior
    - Click: Access to the movie page
    - Hover:
      - Informations displayed: 
        - Production year
        - IMDB note
        - Movie title
        - Element notifying if the movie has been watched already
    - No research entered by the user
      - Display most popular medias from the torrent sources
  - Requirement
    - Infinite pagination
      - What we used: Infinite scrolling
  - Fonctionnalities
    - Ordering by
      - Release date
      - IMDB note 
    - Filtering by
      - Genre
      - IMDB note (ranges)
      - Production year (ranges)

### Video

- Player
  - Requirement
    - Start playing the video once enough bytes are downloaded
    - Do not download a movie more than once on the server
    - Asynchronous processing from datas downloaded
    - Sub-titles selection if available
      - English
      - French
- Informations
  - Synopsis (if available)
  - Casting: producer, director, main actors
  - Year of production
  - Length
  - IMDB note
  - Movie cover
  - Number of views from application's users
- Comments
  - Add a new comment
  - Show comments by all users
- File downloaded
  - Requirement
    - Server side storage
    - CRON job removing files not played after one month
  - Sub-titles
    - Requirement
      - Download movie's subtitles if available
- Video stream
  - Supported formats
    - MP4
    - WEBM
    - Mkv (live convertion)
    - Avi (live convertion)

### Technologies used

- UI / UX
  - ant-design
  - SASS
- Language module
  - i18n
- Client
  - Yarn
  - Babel
  - ESlint
  - Webpack-dev-server
  - React
  - Redux
  - Passport
- Backend
  - Yarn
  - Babel
  - ESlint
  - Express
  - NodeJS
  - MongoDB
  - Mongooe
  - Passport
- External APIs
  - Yify
  - MovieDB
- Scrapping
  - Pirate Bay