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

  token: TokenModel = new TokenModel({ access_token: '', expires_in: 0, token_type: '' });

  constructor(private _httpClient: HttpClient) {
    this.token = JSON.parse(localStorage.getItem('token') || '{}');
  }

  loginSpotifyU(): void {
    window.location.href = `${environment.api_uri}?client_id=${environment.client_id}&redirect_uri=${environment.redirect_uri}&scope=${environment.scope.join(
      "%20")}&response_type=token&show_dialog=true`;
  }


  getTokenDataFromUrl(): any {
    const hash = window.location.hash.substr(1);
    const result = hash.split('&').reduce(function (result: any, item: string) {
      const parts = item.split('=');
      if (parts.length === 2) {
        result[parts[0]] = decodeURIComponent(parts[1]);
      }
      return result;
    }, {});
    return result;
}

  get_token(): Observable<TokenModel> {

    const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');
    
    console.log(localTokenData);

    const tokenData = this.getTokenDataFromUrl();

    console.log('local:', localTokenData);

    if (tokenData && !this.isTokenDataEqual(localTokenData, tokenData)) {
      localStorage.setItem('token', JSON.stringify(tokenData));
    }


    const body = 'grant_type=client_credentials&client_id=' + environment.client_id + '&client_secret=' + environment.client_secret_id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this._httpClient.post(`${environment.API_SPOTIFY}api/token`, body, { headers })
      .pipe(
        map((data: any) => new TokenModel(tokenData))
      );
  }

  isTokenDataEqual(tokenData1: any, tokenData2: any): boolean {
    return tokenData1.access_token === tokenData2.access_token
      && tokenData1.expires_in === tokenData2.expires_in
      && tokenData1.token_type === tokenData2.token_type;
  }

  /* get_token(): Observable<TokenModel> {
 
     const body = 'grant_type=client_credentials&client_id=' + environment.client_id + '&client_secret=' + environment.client_secret_id;
     const headers = new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded'
     });
     
     return this._httpClient.post(`${environment.API_SPOTIFY}api/token`, body, { headers })
     .pipe(
       map((data: any) => new TokenModel(data))
     );
   }*/

  getPlaylist(token: TokenModel, playlistUrl: string): Observable<any> {
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
