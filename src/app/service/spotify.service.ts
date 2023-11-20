import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenModel } from '../models/token-model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})


export class SpotifyService {

  token: TokenModel = new TokenModel({ access_token: '', expires_in: 0, token_type: '' });

  constructor(private _httpClient: HttpClient) {
    this.token = JSON.parse(localStorage.getItem('token') || '{}');
    this.checkLocalStorageAndUrl();
  }

  add_User(userData: any): void {
    fetch('http://localhost:8080/users/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => {
        if (response.ok) {
            return response.json();
        } else {
          throw new Error('Error al agregar usuario.');
        }
      })
      .then(data => {
        console.log(data);
        alert('Usuario agregado con éxito.');
      })
      .catch(error => {
        alert('Error en la solicitud: ' + error.message);
      });
  }


  checkLocalStorageAndUrl(): void {
    const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');

    const tokenData = this.getTokenDataFromUrl();

    if (Object.keys(tokenData).length === 0) {
      console.log('gil');
    } else {
      if (!this.isTokenDataEqual(localTokenData, tokenData)) {
        localStorage.setItem('token', JSON.stringify(tokenData));
      }
    }
  }

  loginSpotifyU(): void {
    window.location.href = `${environment.api_uri}?client_id=${environment.client_id}&redirect_uri=${environment.redirect_uri_home}&scope=${environment.scope.join(
      "%20")}&response_type=token&show_dialog=true`;
  }

  getTokenDataFromUrl(): any {
    const hash = window.location.hash.substr(1);
    const result = hash.split('&').reduce(function (result: any, item: string) {
      const parts = item.split('=');
      if (parts[0] === 'expires_in') {
        result[parts[0]] = parseInt(parts[1]);
      } else {
        result[parts[0]] = parts[1];
      }
      return result;
    }, {});
    return result;
  }

  get_token(): Observable<TokenModel> {

    const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');

    const tokenData = this.getTokenDataFromUrl();

    if (Object.keys(tokenData).length !== 0 && !this.isTokenDataEqual(localTokenData, tokenData)) {
      localStorage.setItem('token', JSON.stringify(tokenData));
    }

    console.log(tokenData);

    const body = 'grant_type=client_credentials&client_id=' + environment.client_id + '&client_secret=' + environment.client_secret_id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this._httpClient.post(`${environment.API_SPOTIFY}api/token`, body, { headers })
      .pipe(
        map((data: any) => new TokenModel(localTokenData))
      );
  }

  isTokenDataEqual(tokenData1: any, tokenData2: any): boolean {
    return tokenData1.access_token === tokenData2.access_token
      && tokenData1.expires_in === tokenData2.expires_in
      && tokenData1.token_type === tokenData2.token_type;
  }

  getPlaylist(token: TokenModel, playlistUrl: string): Observable<any> {
    if (!token) {
      console.error('Error: Token no disponible. Debes obtener el token primero.');
      return of(null);
    }

    let PLAYLIST_URL: string;

    if (!playlistUrl) {
      PLAYLIST_URL = '1KJm1KEVA1xQ0YnuJ3mX3q?si=cdc8326412e04c0f';
    } else {
      PLAYLIST_URL = playlistUrl;
    }
    console.log(token.access_token);

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token.access_token
    });

    return this._httpClient.get(`${environment.API_SPOTIFY_ALL_DATA}playlists/${PLAYLIST_URL}`, { headers })
      .pipe(
        map((response: any) => {
          console.log('Playlist Data:', response);
          return response;
        })
      );
  }


  getTopArtists(token: TokenModel, range: String): Observable<any> {
    if (!token) {
      console.error('Error: Token no disponible. Debes obtener el token primero.');
      return of(null);
    }

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token.access_token
    });
    return this._httpClient.get(`${environment.API_SPOTIFY_ALL_DATA}me/top/artists?time_range=${range}&limit=5`, { headers })
      .pipe(
        map((response: any) => {
          console.log('TOP ARTISTS:', response);
          return response;
        }),
      );
  }
  //tracks?time_range=short_term
  getTopSongs(token: TokenModel, range: String, limit: number): Observable<any> {
    if (!token) {
      console.error('Error: Token no disponible. Debes obtener el token primero.');
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token.access_token
    });
    return this._httpClient.get(`${environment.API_SPOTIFY_ALL_DATA}me/top/tracks?time_range=${range}&limit=${limit}`, { headers })
      .pipe(
        map((response: any) => {
          //  console.log('TOP SONGS:', response);
          return response;
        }),
      );
  }

  //me/top/artists
  //me/top/tracks
  // getDataUser(token: TokenModel, range: String, endpoint: String) {
  //   if (!token) {
  //     console.error('Error: Token no disponible. Debes obtener el token primero.');
  //     return of(null);
  //   }
  //   const headers = new HttpHeaders({
  //     'Authorization': 'Bearer ' + token.access_token
  //   });
  //   return this._httpClient.get(`${environment.API_SPOTIFY_ALL_DATA}${endpoint}?time_range=${range}&limit=10`, { headers })
  //     .pipe(
  //       map((response: any) => {
  //         console.log('TOP SONGS:', response);
  //         return response;
  //       }),
  //     );
  // }


  getAudioFeatures(token: TokenModel, ids: String) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token.access_token
    });
    return this._httpClient.get(`https://api.spotify.com/v1/audio-features?ids=${ids}`, { headers })
      .pipe(
        map((response: any) => {
          console.log('Audio Features:', response);
          return response;
        }),
      );
    //https://api.spotify.com/v1/audio-features
  }


getSongsById(ids: Array<String>, token: TokenModel)
{
  if (!token) {
    console.error('Error: Token no disponible. Debes obtener el token primero.');
    return of(null);
  }
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + token.access_token
  });

  return this._httpClient.get(`${environment.API_SPOTIFY_ALL_DATA}tracks?ids=${ids.join(',')}`, { headers })
    .pipe(
      map((response: any) => {
        console.log('TOP artist BY ID:', response);
        return response;
      }),
    );
}

getArtistsById(ids: Array<String>, token: TokenModel)
{
  if (!token) {
    console.error('Error: Token no disponible. Debes obtener el token primero.');
    return of(null);
  }
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + token.access_token
  });

  return this._httpClient.get(`${environment.API_SPOTIFY_ALL_DATA}artists?ids=${ids.join(',')}`, { headers })
    .pipe(
      map((response: any) => {
        return response;
      }),
    );
}


  getUserDataService(token: TokenModel): Observable<any>
  {
    if (!token) {
      console.error('Error: Token no disponible. Debes obtener el token primero.');
      return of(null);
    }

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token.access_token
    });
    //    https://api.spotify.com/v1/me

    return this._httpClient.get(`${environment.API_SPOTIFY_ALL_DATA}me/`, { headers })
      .pipe(
        map((response: any) => {
          //console.log('MY DATA:', response);
          return response;
        }),
      );

  }




  getRecommendations(token: TokenModel, songDataIds: Array<String> | null, values: any | null) {
    if (!token) {
      console.error('Error: Token no disponible. Debes obtener el token primero.');
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token.access_token
    });
  
    if (!values) {
      if (songDataIds) {
        console.log('song data ids en SERVICE: ', songDataIds);
        console.log(songDataIds.join(','));
        return this._httpClient.get(`${environment.API_SPOTIFY_ALL_DATA}recommendations?limit=15&seed_tracks=${songDataIds.join(',')}`, { headers })
          .pipe(
            map((response: any) => {
              console.log('TOP RECOMMENDED:', response);
              return response;
            })
          );
      }
    } else {
      console.log('values: ',values);
      return this._httpClient.get(`${environment.API_SPOTIFY_ALL_DATA}recommendations?limit=15&seed_tracks=6OnfBiiSc9RGKiBKKtZXgQ&target_acousticness=${values[0]}&target_danceability=${values[1]}&target_energy=${values[2]}&target_popularity=${values[3]}&target_valence=${values[4]}`, { headers })
        .pipe(
          map((response: any) => {
            console.log('TOP RECOMMENDED:', response);
            return response;
          })
        );
    }
    return of(null);
  }


  //users/{user_id}/playlists

  postPlaylist(token: TokenModel, user_id: String) {
    if (!token) {
      console.error('Error: Token no disponible. Debes obtener el token primero.');
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token.access_token
    });
    const body = {
      "name": "Playlist Creada con Apify!",
      "description": "Holaaaa",
      "public": true
    };

    return this._httpClient.post(`${environment.API_SPOTIFY_ALL_DATA}users/${user_id}/playlists`, body, { headers })
      .pipe(
        map((response: any) => {
          return response;
        })
      );

  }


  postSongOnPlaylist(token: TokenModel, playlist_id: String, uriIds: Array<String>) {
    if (!token) {
      console.error('Error: Token no disponible. Debes obtener el token primero.');
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token.access_token
    });
    const body = {
      "name": "Playlist 2 bro!",
      "description": 'Esta playlist fue creada por kevin tolosa y franco güidi',
      "public": true
    };
    return this._httpClient.post(`${environment.API_SPOTIFY_ALL_DATA}playlists/${playlist_id}/tracks?uris=${uriIds.join(',')}`, body, { headers })
      .pipe(
        map((response: any) => {
          return response;
        })
      );


  }



}
