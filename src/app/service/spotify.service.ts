import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { TokenModel } from '../models/token-model';
import { Token } from '@angular/compiler';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private API_SPOTIFY = environment.API_SPOTIFY;
  private API_SPOTIFY_ALL_DATA = environment.API_SPOTIFY_ALL_DATA;
  constructor(private _httpClient: HttpClient) { }


  client_id = environment.client_id;
  client_secret_id = environment.client_secret_id;


  get_token(): Observable<TokenModel> {
    // console.log(this.client_id);
    const body = 'grant_type=client_credentials&client_id=' + environment.client_id + '&client_secret=' + environment.client_secret_id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this._httpClient.post(`${this.API_SPOTIFY}api/token`, body, { headers })
    .pipe(
      map((data: any) => new TokenModel(data))
    );
  }
  //= async (token) =>

  getPlaylist(token: TokenModel): Observable<any> {
    if (!token) {
      console.error('Error: Token no disponible. Debes obtener el token primero.');
      return of(null);
    }
  //https://open.spotify.com/playlist/
    const PLAYLIST_URL = '1KJm1KEVA1xQ0YnuJ3mX3q?si=cdc8326412e04c0f';
    //console.log('HOLAAAAA');
    //console.log(token.access_token);

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token.access_token
    });
  
    return this._httpClient.get(`${this.API_SPOTIFY_ALL_DATA}playlists/${PLAYLIST_URL}`, { headers })
      .pipe(
        map((response: any) => response)
      );



  }

}
