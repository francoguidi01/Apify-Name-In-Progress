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

  constructor(private _httpClient: HttpClient) { }

  client_id = 'a00cd5e5b4d34c1996b89d04beaa411a';
  client_secret_id = '6313d27a268747029d6c51a7d5ad34a7';


  get_token(): Observable<TokenModel> {
    // console.log(this.client_id);
    const body = 'grant_type=client_credentials&client_id=' + this.client_id + '&client_secret=' + this.client_secret_id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    
    return this._httpClient.post(`${this.API_SPOTIFY}api/token`, body, { headers })
    .pipe(
      map((data: any) => new TokenModel(data))
    );
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
  
    return this._httpClient.get(`${this.API_SPOTIFY_ALL_DATA}playlists/${PLAYLIST_URL}`, { headers })
      .pipe(
        map((response: any) => {
          console.log('Playlist Data:', response);
          return response; 
        })
      );
  }

}
