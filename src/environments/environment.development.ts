export const environment = {
    client_id: 'a00cd5e5b4d34c1996b89d04beaa411a',
    client_secret_id: '6313d27a268747029d6c51a7d5ad34a7',
    API_SPOTIFY: 'https://accounts.spotify.com/',
    API_SPOTIFY_ALL_DATA: 'https://api.spotify.com/v1/',
    redirect_uri: "http://localhost:4200/login",
    api_uri: "https://accounts.spotify.com/authorize",
    scope: [
        "user-follow-read",
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-private",
        "user-read-email",
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-top-read"
    ]
};
