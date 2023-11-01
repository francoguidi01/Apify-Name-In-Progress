import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/service/spotify.service';
@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent {

  token: any;
  topArtists: any;
  topSongs: any;
  userData: any;
  number: number = 1;
  // userDataToSave: UserData = new UserData;


  constructor(private service: SpotifyService) { }



  getTopArtists(): void {
    const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');
    console.log(localTokenData);
    if (Object.keys(localTokenData).length !== 0) {
      this.token = localTokenData;
      this.service.getTopArtists(this.token).subscribe(topArtists => {
        this.topArtists = topArtists;
      });
    } else {
      this.service.get_token().subscribe(token => {
        this.token = token;
        this.service.getTopArtists(this.token).subscribe(topArtists => {
          this.topArtists = topArtists;
        });
      });
    }
  }

  getTopSongs(): void {
    const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');
    console.log(localTokenData);
    if (Object.keys(localTokenData).length !== 0) {
      this.token = localTokenData;
      this.service.getTopSongs(this.token).subscribe(topSongs => {
        this.topSongs = topSongs;
      });
    } else {
      this.service.get_token().subscribe(token => {
        this.token = token;
        this.service.getTopArtists(this.token).subscribe(topSongs => {
          this.topSongs = topSongs;
        });
      });
    }
  }









}
