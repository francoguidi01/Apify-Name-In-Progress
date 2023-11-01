import { Component } from '@angular/core';
import { SpotifyService } from '../../service/spotify.service';
import { environment } from 'src/environments/environment.development';
import { UsersDataService } from 'src/app/service/user_data/users-data.service';
import { UserData } from 'src/app/models/user-data';
import { SongData } from 'src/app/models/song-data';
import { ArtistsData } from 'src/app/models/artists-data';

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
  songToSave: SongData = new SongData;
  artistToSave: ArtistsData = new ArtistsData;
  userDataToSave: UserData = new UserData;
  new: boolean = true;
  imageUrl: string = '';

  constructor(private service: SpotifyService, private user_service: UsersDataService) {
    environment.token = JSON.parse(localStorage.getItem('token') || '{}');
  }

  ngOnInit(): void {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.imageUrl = userData.url_photo || '';
    }

    this.getUserData();
    //this.getTopArtist();
  }


  getUserData(): void { 
    const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');
    console.log(localTokenData);
    if (Object.keys(localTokenData).length !== 0) {
      this.token = localTokenData;
      this.service.getUserDataService(this.token).subscribe(userData => {
        this.userData = userData;
  
        const storedUserData = JSON.parse(localStorage.getItem('userData') || '{}');
        if (!this.isEqualUserData(storedUserData, userData)) {
          this.onAddUser(userData);
        } else {
          console.log('Data in local storage is the same as the new data.');
        }

        console.log(userData);
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
   
  isEqualUserData(userData1: any, userData2: any): boolean {
    return (
      userData1.id === userData2.id &&
      userData1.display_name === userData2.display_name &&
      userData1.url_photo === userData2.images[1].url
    );
  }
  
  onAddUser(userData: any) {
    this.userDataToSave = {
      id: userData.id,
      display_name: userData.display_name,
      url_photo: userData.images[1].url
    };
  
    this.user_service.addUser(this.userDataToSave).subscribe(
      (data) => {
        console.log('added', data);
        localStorage.setItem('userData', JSON.stringify(this.userDataToSave));
        this.getTopSongs();

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
    console.log(localTokenData);
    if (Object.keys(localTokenData).length !== 0) {
      this.token = localTokenData;
      this.service.getTopSongs(this.token).subscribe(songData => {

        this.topSongs = songData;

        this.onAddSong(songData.items);

      });
    } else {
      this.service.get_token().subscribe(token => {
        this.token = token;
        this.service.getTopSongs(this.token).subscribe(songData => {
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
        console.log('added', data);
      });
    }
  }

  /*
    getTopArtist(): void {
      const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');
      console.log(localTokenData);
      if (Object.keys(localTokenData).length !== 0) {
        this.token = localTokenData;
        this.service.getTopArtists(this.token).subscribe(artistsData => {
  
          this.topArtists = artistsData;
  
          this.onAddArtist(artistsData.items);
  
        });
      } else {
        this.service.get_token().subscribe(token => {
          this.token = token;
          this.service.getTopArtists(this.token).subscribe(artistsData => {
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
          console.log('added', data);
        });
      }
    }
  
  */





}