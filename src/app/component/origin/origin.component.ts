import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/service/spotify.service';
import { TokenModel } from 'src/app/models/token-model';
import { LoginComponent } from '../login/login.component';

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

//esto tendria que ser un model?
  show_promedio: boolean = false;
  promedio: number = 0;
  you_are_normie: string = '';

  promedio_popularity() {
    let sum_popularity = 0;
    this.playlist.tracks.items.forEach((item: { track: { name: any; popularity: any; }; }) => {
      const song = item.track.name;
      const song_popularity = item.track.popularity;
      sum_popularity += song_popularity;
    });
    if (this.playlist.tracks.items.length > 0) {
      this.promedio = sum_popularity / this.playlist.tracks.items.length;
      this.show_promedio = true;
      if(this.promedio<50)
      {
        this.you_are_normie='no sos, bro tranqui';
      }else
      {
        this.you_are_normie='ppfpfpfpf aguante ed sheeran no?'
      }
      console.log(this.promedio);
    } else {
      this.promedio = 0;
      this.show_promedio = false;
    }
  }
}
