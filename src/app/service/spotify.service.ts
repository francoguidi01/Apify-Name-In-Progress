import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { TokenModel } from '../models/token-model';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})


export class SpotifyService {


  private API_SPOTIFY = 'https://accounts.spotify.com/';
  private API_SPOTIFY_ALL_DATA = 'https://api.spotify.com/v1/';

  token: TokenModel = new TokenModel({ access_token: '', expires_in: 0, token_type: '' });

  constructor(private _httpClient: HttpClient) {
    this.token = JSON.parse(localStorage.getItem('token') || '{}');
  }

  client_id = 'a00cd5e5b4d34c1996b89d04beaa411a';
  client_secret_id = '6313d27a268747029d6c51a7d5ad34a7';


  loginSpotifyU(): void {

    const redirect_uri = "http://localhost:4200/login";

    const api_uri = "https://accounts.spotify.com/authorize";

    const scope = [
      "user-follow-read", //(Accede a tus seguidores y a quién sigues)
      "user-read-playback-state", //(Lee el contenido que se está reproduciendo actualmente)
      "user-modify-playback-state", //(Controle la reproducción en sus clientes de Spotify)
      "user-read-private", //(Accede a los datos de tu suscripción)
      "user-read-email", //(Obtenga su dirección de correo electrónico real)
      "user-read-currently-playing", //(Lea el contenido que se reproduce actualmente.)
      "user-read-recently-played", //(Accede a tus elementos reproducidos recientemente)
      "user-top-read" //(Lee sus principales artistas y contenido)
    ];

    window.location.href = `${api_uri}?client_id=${this.client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
      "%20")}&response_type=token&show_dialog=true`;
  }


  getTokenDataFromUrl(): any {
    const hash = window.location.hash.substr(1);
    const result = hash.split('&').reduce(function (result: any, item: string) {
      const parts = item.split('=');
      result[parts[0]] = parts[1];
      return result;
    }, {});
    return result;
  }

  get_token(): Observable<TokenModel> {
    
    const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');
    
  const tokenData = this.getTokenDataFromUrl();

  if (tokenData && !this.isTokenDataEqual(localTokenData, tokenData)) {
    localStorage.setItem('token', JSON.stringify(tokenData));
  }

    console.log(tokenData);

    const body = 'grant_type=client_credentials&client_id=' + this.client_id + '&client_secret=' + this.client_secret_id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this._httpClient.post(`${this.API_SPOTIFY}api/token`, body, { headers })
      .pipe(
        map((data: any) => new TokenModel(localTokenData))
      );
  }

  isTokenDataEqual(tokenData1: any, tokenData2: any): boolean {
    return tokenData1.access_token === tokenData2.access_token 
        && tokenData1.expires_in === tokenData2.expires_in 
        && tokenData1.token_type === tokenData2.token_type;
  }

  /* get_token(): Observable<TokenModel> {
 
     const body = 'grant_type=client_credentials&client_id=' + this.client_id + '&client_secret=' + this.client_secret_id;
     const headers = new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded'
     });
     
     return this._httpClient.post(`${this.API_SPOTIFY}api/token`, body, { headers })
     .pipe(
       map((data: any) => new TokenModel(data))
     );
   }*/

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

    return this._httpClient.get(`${this.API_SPOTIFY_ALL_DATA}playlists/${PLAYLIST_URL}`, { headers })
      .pipe(
        map((response: any) => {
          console.log('Playlist Data:', response);
          return response;
        })
      );
  }

  getFollowed(token: TokenModel): Observable<any> {
    if (!token) {
      console.error('Error: Token no disponible. Debes obtener el token primero.');
      return of(null);
    }

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token.access_token
    });

    return this._httpClient.get('https://api.spotify.com/v1/me/top/artists', { headers })
      .pipe(
        map((response: any) => {
          console.log('TOP ARTISTS:', response);
          return response;
        }),
      );
  }


}
