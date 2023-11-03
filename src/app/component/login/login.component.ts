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


  getUserData(): void {
    const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');
    console.log(localTokenData);
    if (Object.keys(localTokenData).length !== 0) {
        this.token = localTokenData;
        this.service.getUserDataService(this.token).subscribe(userData => {
            this.userData = userData;

            this.userDataToSave = {
                id: userData.id,
                display_name: userData.display_name,
                url_photo: userData.images[1].url
            };

            // Llamada al método addUser del servicio UsersDataService
            this.user_service.addUser(this.userDataToSave).subscribe(data => {
                console.log(data); // Aquí puedes manejar la respuesta si lo necesitas
            }, error => {
                console.error('Error al agregar usuario: ', error);
                //ACORDATE DE GUARDAR LAS CANCIONES Y LOS ARTISTAS BOLUDO
            });

            localStorage.setItem('userData', JSON.stringify(this.userDataToSave));
            console.log(this.userDataToSave);
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


  onAddUser() {

    console.log(this.userDataToSave);
    this.user_service.addUser(this.userDataToSave).subscribe(data => {
      console.log('added', data);
      // Manejar la respuesta después de agregar el elemento
    });
  }

  onAddSong() {
    //console.log(this.userDataToSave);
    let songToSave = {
      id_song: this.topSongs.items[0].uri,
      id_api_song: this.topSongs.items[0].id,
      user: {
        id: this.userDataToSave.id
      }
    }
    console.log(songToSave);
    this.user_service.addSongs(songToSave).subscribe(data => {
      console.log('added', data);
    });
  }

}
/*
 id_song INT PRIMARY KEY,
    id_api_song VARCHAR(100) NOT NULL,
    id_user VARCHAR(300) NOT NULL,*/