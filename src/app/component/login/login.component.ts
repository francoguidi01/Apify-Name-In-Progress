import { Component } from '@angular/core';
import { SpotifyService } from '../../service/spotify.service';

import { UsersDataService } from 'src/app/service/user_data/users-data.service';
import { UserData } from 'src/app/models/user-data';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  token: any;
  topArtists: any;
  topSongs: any;
  userData: any;
  userDataToSave: UserData = new UserData;

  constructor(private service: SpotifyService,
    private user_service: UsersDataService) { }

  ngOnInit() {
    this.user_service.getAllUsers().subscribe(data => {
      console.log(data)
    });
  }




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