import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/service/spotify.service';
import { TokenModel } from 'src/app/models/token-model';
@Component({
  selector: 'app-origin',
  templateUrl: './origin.component.html',
  styleUrls: ['./origin.component.css']
})
export class OriginComponent {

  title = 'apify';
  token: any;
  playlist: any;
  playlisturl=''
  token2: TokenModel = new TokenModel({access_token: '', expires_in: 3600, token_type: 'Bearer'});

  constructor(private service: SpotifyService) { }

  ngOnInit(): void {

  }

  login(): void {
    localStorage.setItem('userData', JSON.stringify({}));
    localStorage.setItem('token', JSON.stringify({}));
    this.service.loginSpotifyU(); 
  }

}
