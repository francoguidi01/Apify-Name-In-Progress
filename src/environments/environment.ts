export const environment = {
    CLIENT_ID: 'a00cd5e5b4d34c1996b89d04beaa411a',
    CLIENT_SECRET_ID: '6313d27a268747029d6c51a7d5ad34a7',
    API_SPOTIFY: 'https://accounts.spotify.com/',
    API_SPOTIFY_ALL_DATA: 'https://api.spotify.com/v1/',
    REDIRECT_URL_HOME: "http://localhost:4200/home",
    API_URL: "https://accounts.spotify.com/authorize",
    SCOPES: [
        "user-follow-read",
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-private",
        "user-read-email",
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-top-read",
        "playlist-modify-public",
        "playlist-modify-private"
    ],
    PLAYLIST_URL: '1KJm1KEVA1xQ0YnuJ3mX3q?si=cdc8326412e04c0f',
    IMG_PROFILE_USER_URL:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',

    GET_ALL_USERS: "http://localhost:8080/user/get-all-users",
    GET_ALL_SONGS: "http://localhost:8080/songs/get-all-songs",
    GET_ALL_LEADERBOARD: "http://localhost:8080/leaderboard/get-leaderboard",
    GET_ALL_FRIENDS: "http://localhost:8080/friends/get-all-friends",
    GET_USER_BY_ID: "http://localhost:8080/user/get-an-user/",
    GET_SONG_BY_ID: "http://localhost:8080/songs/get-dto-songs-by-id/",
    GET_ARTIST_BY_ID: "http://localhost:8080/artists/get-dto-artist-by-id/",
    GET_FRIEND_BY_ID: "http://localhost:8080/friends/get-friends-by-user/",
    DELETE_USER_URL: "http://localhost:8080/user/delete/",
    DELETE_FRIEND_URL: "http://localhost:8080/friends/delete-friend/",
    DELETE_SONGS_URL: "http://localhost:8080/songs/delete-song/",
    DELETE_ARTIST_URL: "http://localhost:8080/artists/delete-artist/",
    DELETE_LEADERBOARD_URL: "http://localhost:8080/leaderboard/delete-leaderboard-by-user/",
    ADD_USER_URL: "http://localhost:8080/user/add",
    ADD_SONG_URL: "http://localhost:8080/songs/add-song",
    ADD_ARTIST_URL: "http://localhost:8080/artists/add-artist",
    ADD_TO_LEADER_URL: "http://localhost:8080/leaderboard/add-leaderboard",
    ADD_FRIEND_URL: "http://localhost:8080/friends/add-friend"
};
