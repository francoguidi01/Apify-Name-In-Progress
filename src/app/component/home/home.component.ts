import { Component} from '@angular/core';
import { SpotifyService } from '../../service/spotify.service';
import { environment } from 'src/environments/environment.development';
import { UsersDataService } from 'src/app/service/user_data/users-data.service';
import { UserData } from 'src/app/models/user-data';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  token: any;
  userData: any;
  topArtists: any;
  topSongs: any;
  userDataToSave: UserData = new UserData;
  new: boolean = true;
  imageUrl: string = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  constructor(private service: SpotifyService, private user_service: UsersDataService) {
    environment.token = JSON.parse(localStorage.getItem('token') || '{}');
  }

  ngOnInit(): void {
    this.getUserData()

  }
  
  getUserData(): void {
    const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');
    if (Object.keys(localTokenData).length !== 0) {
      this.token = localTokenData;
      this.service.getUserDataService(this.token).subscribe(userData => {
        this.userData = userData;

        this.onAddUser(userData);

      });
    } else {
      this.service.get_token().subscribe(token => {
        this.token = token;
        this.service.getUserDataService(this.token).subscribe(userData => {
          this.userData = userData;
        });
      });
    }
  }

  onAddUser(userData: any) {
    this.userDataToSave = {
      id: userData.id,
      display_name: userData.display_name,
      url_photo: userData.images && userData.images.length > 1 ? userData.images[1].url : this.imageUrl
    };

    this.imageUrl = this.userDataToSave.url_photo || '';


    this.user_service.addUser(this.userDataToSave).subscribe(
      (data) => {
        localStorage.setItem('userData', JSON.stringify(this.userDataToSave));
        this.getTopSongs();
        this.getTopArtist();
        console.log('added', data);
      },
      (error) => {
        if (error.status === 409) {
          console.log('User already exists. Adding to local storage...');
          localStorage.setItem('userData', JSON.stringify(this.userDataToSave));
          this.new = false;
        } else {
          console.error('An error occurred:', error);
        }
      }
    );
  }


  getTopSongs(): void {
    const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');
    if (Object.keys(localTokenData).length !== 0) {
      this.token = localTokenData;
      this.service.getTopSongs(this.token, 'long_term',5).subscribe(songData => {

        this.topSongs = songData;

        this.onAddSong(songData.items);

      });
    } else {
      this.service.get_token().subscribe(token => {
        this.token = token;
        this.service.getTopSongs(this.token, 'long_term', 5).subscribe(songData => {
          this.topSongs = songData;
          this.onAddSong(songData.items);
        });
      });
    }
  }

  onAddSong(songData: any[]) {
    for (let i = 0; i < songData.length; i++) {
      const currentSongData = songData[i];
      const songToSave = {
        id_api_song: currentSongData.id,
        user: {
          id: this.userDataToSave.id
        }
      };
      this.user_service.addSongs(songToSave).subscribe(data => {
      });
    }
  }


  getTopArtist(): void {
    const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');
    if (Object.keys(localTokenData).length !== 0) {
      this.token = localTokenData;
      this.service.getTopArtists(this.token, 'long_term').subscribe(artistsData => {

        this.topArtists = artistsData;

        this.onAddArtist(artistsData.items);

      });
    } else {
      this.service.get_token().subscribe(token => {
        this.token = token;
        this.service.getTopArtists(this.token, 'long_term').subscribe(artistsData => {
          this.topArtists = artistsData;
          this.onAddArtist(artistsData.items);
        });
      });
    }
  }


  onAddArtist(artistsData: any[]) {
    for (let i = 0; i < artistsData.length; i++) {

      const currentArtistData = artistsData[i];

      const artistToSave = {
        id_api_artist: currentArtistData.id,
        user: {
          id: this.userDataToSave.id
        }
      };
      this.user_service.addArtist(artistToSave).subscribe(data => {
      });
    }
  }
}