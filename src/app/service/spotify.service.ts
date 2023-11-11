import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
//import 'rxjs/add/operator/map';
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
            return response.json(); // Necesitas parsear la respuesta JSON
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
    window.location.href = `${environment.api_uri}?client_id=${environment.client_id}&redirect_uri=${environment.redirect_uri_mp}&scope=${environment.scope.join(
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


  getTopArtists(token: TokenModel): Observable<any> {
    if (!token) {
      console.error('Error: Token no disponible. Debes obtener el token primero.');
      return of(null);
    }

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token.access_token
    });

    return this._httpClient.get(`${environment.API_SPOTIFY_ALL_DATA}me/top/artists?limit=5`, { headers })
      .pipe(
        map((response: any) => {
          console.log('TOP ARTISTS:', response);
          return response;
        }),
      );
  }

  getTopSongs(token: TokenModel): Observable<any> {
    if (!token) {
      console.error('Error: Token no disponible. Debes obtener el token primero.');
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token.access_token
    });

    return this._httpClient.get(`${environment.API_SPOTIFY_ALL_DATA}me/top/tracks?limit=5`, { headers })
      .pipe(
        map((response: any) => {
          console.log('TOP SONGS:', response);
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

}
