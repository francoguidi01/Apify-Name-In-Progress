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
    this.getTopSongs();
  }

  constructor(private service: SpotifyService) {
  }

  token: any;
  recommended: any;
  topSongs: any;
  idsArray: Array<String> = [];
  uriIds: Array<String> = [];
  playlistCreated: any;
  showLoadingSection: boolean = true;
  showResultSection: boolean = false;

  loadYeah() {
    if (this.showResultSection) {
      const yeah = document.getElementById('yeahSound') as HTMLAudioElement;
      yeah.play();
    }
  }

  redirectToPlaylist() {
    window.open(this.playlistCreated.external_urls.spotify, '_blank');

  }

  getTopSongs(): void {
    const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');
    if (Object.keys(localTokenData).length !== 0) {
      this.token = localTokenData;
      this.service.getTopSongs(this.token, 'long_term', 5).subscribe(songData => {
        this.topSongs = songData;
        this.getSongsId();
      });
    } else {
      this.service.get_token().subscribe(token => {
        this.token = token;
        this.service.getTopSongs(this.token, 'long_term', 5).subscribe(songData => {
          this.topSongs = songData;
          this.getSongsId();
        });
      });
    }
  }


  getSongsId() {
    //console.log(this.topSongs)
    this.topSongs.items.forEach((items: { id: String }) => {
      this.idsArray.push(items.id);
    });
    this.getRecommendations();
   // console.log(this.idsArray);
  }


  getRecommendations() {
    const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');
    if (Object.keys(localTokenData).length !== 0) {
      this.token = localTokenData;
      this.service.getRecommendations(this.token, this.idsArray, null).subscribe(recommended => {
        this.recommended = recommended;

        this.showLoadingSection = false;
        this.showResultSection = true;
        this.loadYeah();
      });
    } else {
      this.service.get_token().subscribe(token => {
        this.token = token;
        this.service.getRecommendations(this.token, this.idsArray, null).subscribe(recommended => {
          this.recommended = recommended;

          this.showLoadingSection = false;
          this.showResultSection = true;
          this.loadYeah();
        });
      });
    }
  }




  postPlaylist() {
    const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');
    const userId = JSON.parse(localStorage.getItem('userData') || '{}').id;

    //  console.log(localTokenData);
    if (Object.keys(localTokenData).length !== 0) {
      this.token = localTokenData;
      this.service.postPlaylist(this.token, userId).subscribe(playlistCreated => {
        this.playlistCreated = playlistCreated;
        this.getSongsRecommendedURIS();
      });
    } else {
      this.service.get_token().subscribe(token => {
        this.token = token;
        this.service.postPlaylist(this.token, userId).subscribe(playlistCreated => {
          this.playlistCreated = playlistCreated;
          this.getSongsRecommendedURIS();
        });
      });
    }
  }

  getSongsRecommendedURIS() {
    this.recommended.tracks.forEach((tracks: { uri: String }) => {
      this.uriIds.push(tracks.uri);
    });

    this.postSongOnPlaylist();
  }

  postSongOnPlaylist() {
    const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');
    if (Object.keys(localTokenData).length !== 0) {
      this.token = localTokenData;
      this.service.postSongOnPlaylist(this.token, this.playlistCreated.id, this.uriIds).subscribe(songsAdded => {
      this.redirectToPlaylist();
      });
    } else {
      this.service.get_token().subscribe(token => {
        this.token = token;
        this.service.postSongOnPlaylist(this.token, this.playlistCreated.id, this.uriIds).subscribe(songsAdded => {
          this.redirectToPlaylist();
        });
      });
    }
  }

}