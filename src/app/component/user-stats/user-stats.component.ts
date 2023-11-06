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
  //topData: any;
  userData: any;
  number: number = 1;
  // userDataToSave: UserData = new UserData;


  constructor(private service: SpotifyService) { }



  getTopArtists(range: String): void {
    const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');
    console.log(localTokenData);
    if (Object.keys(localTokenData).length !== 0) {
      this.token = localTokenData;
      this.service.getTopArtists(this.token, range).subscribe(topArtists => {
        this.topArtists = topArtists;
      });
    } else {
      this.service.get_token().subscribe(token => {
        this.token = token;
        this.service.getTopArtists(this.token, range).subscribe(topArtists => {
          this.topArtists = topArtists;
        });
      });
    }
  }

  getTopSongs(range: String/*, limit: String*/): void {
    const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');
    console.log(localTokenData);
    if (Object.keys(localTokenData).length !== 0) {
      this.token = localTokenData;
      this.service.getTopSongs(this.token, range/*, limit*/).subscribe(topSongs => {
        this.topSongs = topSongs;
      });
    } else {
      this.service.get_token().subscribe(token => {
        this.token = token;
        this.service.getTopSongs(this.token, range/*, limit*/).subscribe(topSongs => {
          this.topSongs = topSongs;
        });
      });
    }
  }


  //me/top/artists
  //me/top/tracks


  // getTopData(range: String, endpoint: String): void {
  //   const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');
  //   console.log(localTokenData);
  //   if (Object.keys(localTokenData).length !== 0) {
  //     this.token = localTokenData;
  //     this.service.getDataUser(this.token, range, endpoint).subscribe(topData => {
  //       this.topData = topData;
  //     });
  //   } else {
  //     this.service.get_token().subscribe(token => {
  //       this.token = token;
  //       this.service.getDataUser(this.token, range, endpoint).subscribe(topData => {
  //         this.topData = topData;
  //       });
  //     });
  //   }
  // }


 













  currentAudio: HTMLAudioElement | undefined = undefined;
  // currentUrl: string = '';
  previewStarted: boolean = true;

  playPreview(audioUrl: string) {
    if (this.currentAudio) {
      this.currentAudio.pause();
    }
    if (audioUrl) {
      const audio: HTMLAudioElement = new Audio(audioUrl);
      audio.play();
      this.currentAudio = audio;
      //this.currentUrl = audioUrl;
      this.previewStarted = false;
    } else {
      alert('No tiene preview :(');
    }
  }

  pausePreview() {
    if (this.currentAudio) {
      this.currentAudio.pause();
    }
    this.previewStarted = true;
    console.log('holaAAAAAAAAAAAAAAAaaaAaA');
  }








}
