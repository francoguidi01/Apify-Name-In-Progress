import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/service/spotify.service';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-make-a-playlist-recommendations',
  templateUrl: './make-a-playlist-recommendations.component.html',
  styleUrls: ['./make-a-playlist-recommendations.component.css']
})
export class MakeAPlaylistRecommendationsComponent {

  ngOnInit(): void {
    console.log('hola? entro?')
    this.getTopSongs();
    // this.getSongsId();
  }



  constructor(private service: SpotifyService) {
    environment.token = JSON.parse(localStorage.getItem('token') || '{}');
    environment.token = JSON.parse(localStorage.getItem('userData') || '{}');

  }

  token: any;
  recommended: any;
  topSongs: any;
  idsArray: Array<String> = [];
  uriIds: Array<String> = [];
  playlistCreated: any;


  getTopSongs(): void {
    const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');
    if (Object.keys(localTokenData).length !== 0) {
      this.token = localTokenData;
      this.service.getTopSongs(this.token, 5).subscribe(songData => {
        this.topSongs = songData;
        console.log(this.topSongs)
      });
    } else {
      this.service.get_token().subscribe(token => {
        this.token = token;
        this.service.getTopSongs(this.token, 5).subscribe(songData => {
          this.topSongs = songData;
          console.log(this.topSongs)
        });
      });
    }
  }




  getSongsId() {
    console.log(this.topSongs)
    this.topSongs.items.forEach((items: { id: String}) => {
      this.idsArray.push(items.id);
    });
    console.log(this.idsArray);
  }


  getRecommendations() {
    const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');
  //  console.log(localTokenData);
    if (Object.keys(localTokenData).length !== 0) {
      this.token = localTokenData;
      this.service.getRecommendations(this.token, this.idsArray).subscribe(recommended => {
        this.recommended = recommended;
        console.log(recommended);
      });
    } else {
      this.service.get_token().subscribe(token => {
        this.token = token;
        this.service.getRecommendations(this.token, this.idsArray).subscribe(recommended => {
          this.recommended = recommended;
          console.log(recommended);
        });
      });
    }
  }


  postPlaylist() {
    const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');
  //  console.log(localTokenData);
    if (Object.keys(localTokenData).length !== 0) {
      this.token = localTokenData;
      this.service.postPlaylist(this.token, 'francoguidi1235').subscribe(playlistCreated => {
        this.playlistCreated = playlistCreated;
        console.log(playlistCreated);
      });
    } else {
      this.service.get_token().subscribe(token => {
        this.token = token;
        this.service.postPlaylist(this.token, 'francoguidi1235').subscribe(playlistCreated => {
          this.playlistCreated = playlistCreated;
          console.log(playlistCreated);
        });
      });
    }
  }






  getSongsRecommendedURIS(){
    this.recommended.tracks.forEach((tracks: { uri: String}) => {
      this.uriIds.push(tracks.uri);
    });
    console.log(this.uriIds);
  }









  postSongOnPlaylist() {
    const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');
   // console.log(localTokenData);
    if (Object.keys(localTokenData).length !== 0) {
      this.token = localTokenData;
      this.service.postSongOnPlaylist(this.token, this.playlistCreated.id, this.uriIds).subscribe(songsAdded => {
       // this.songsAdded = songsAdded;
        console.log(songsAdded);
      });
    } else {
      this.service.get_token().subscribe(token => {
        this.token = token;
        this.service.postSongOnPlaylist(this.token, this.playlistCreated.id, this.uriIds).subscribe(songsAdded => {
        //  this.songsAdded = songsAdded;
          console.log(songsAdded);
        });
      });
    }
  }

}
