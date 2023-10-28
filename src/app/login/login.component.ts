import { Component } from '@angular/core';
import { SpotifyService } from '../service/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  token: any;
  followedArtist: any;

  constructor(private service: SpotifyService) { }

  getAlgo(): void {
    const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');
    console.log(localTokenData);
    if (Object.keys(localTokenData).length !== 0) {
      this.token = localTokenData;
      this.service.getFollowed(this.token).subscribe(followedArtist => {
        this.followedArtist = followedArtist;
      });
    } else {
      this.service.get_token().subscribe(token => {
        this.token = token;
        this.service.getFollowed(this.token).subscribe(followedArtist => {
          this.followedArtist = followedArtist;
        });
      });
    }
  }
}
