import { Component, ElementRef, ViewChild } from '@angular/core';
import { SpotifyService } from '../../service/spotify.service';
import { environment } from 'src/environments/environment.development';
import { UsersDataService } from 'src/app/service/user_data/users-data.service';
import { UserData } from 'src/app/models/user-data';

@Component({
  selector: 'app-guess-song',
  templateUrl: './guess-song.component.html',
  styleUrls: ['./guess-song.component.css']
})
export class GuessSongComponent {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef;


  playlist: any;
  randomSongs: any[] = [];
  winningTrack: any;
  turn: number = 0;
  points: number = 0;
  limitTime: number = 4;
  hintMessage: string = '';
  albumImageUrl: string = '';
  hintButtonDisabled: boolean = false;
  songsButtonDisabled: boolean = false;
  win: boolean = false;
  alert: boolean = false;

  userFromDatabase: any;
  userDataToSave: UserData = new UserData;

  constructor(private service: SpotifyService, private user_service: UsersDataService) {
    environment.token = JSON.parse(localStorage.getItem('token') || '{}');
    environment.token = JSON.parse(localStorage.getItem('userData') || '{}');

  }

  ngOnInit() {
    this.getTheLeaderboard();
  }


  getThePlaylistForGuess(): void {

    const localtoken = JSON.parse(localStorage.getItem('token') || '{}');
    this.win = true;
    this.alert = false;
    this.getTheLeaderboard();

    this.service.getPlaylist(localtoken, environment.playlisturl).subscribe(playlist => {
      if (playlist) {
        this.playlist = playlist;
        this.playTheGame();
        this.hintMessage = '';
        this.albumImageUrl = '';
        this.turn = 0;
        this.points = 0;
      } else {
        console.error('La lista de reproducción no está disponible.');
      }
    });

  }

  playTheGame() {
    this.hintButtonDisabled = false;
    this.songsButtonDisabled = false;
    this.limitTime = 4;
    this.randomSongs = this.getRandomSongsFromPlaylist(this.playlist.tracks.items, 4);

    const winningTrackIndex = Math.floor(Math.random() * 4);
    this.winningTrack = this.randomSongs[winningTrackIndex];
    console.log(this.winningTrack);

    const audioPlayer: HTMLAudioElement = document.getElementById('audioPlayer') as HTMLAudioElement;
    audioPlayer.src = this.winningTrack.track.preview_url;
    audioPlayer.play();


    audioPlayer.addEventListener('timeupdate', () => {

      if (audioPlayer.currentTime >= this.limitTime) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      }
    });


  }

  showHint() {
    if (!this.playlist) {
      alert('Por que no esperas un poquito emocion');
    }
    else if (this.turn === 0) {
      this.hintMessage = `Año: ${this.winningTrack.track.album.release_date}`;
    } else if (this.turn === 1) {
      this.hintMessage = `Año: ${this.winningTrack.track.album.release_date} / Artista: ${this.winningTrack.track.artists[0].name}`;
    } else if (this.turn === 2) {
      this.hintMessage = `Año: ${this.winningTrack.track.album.release_date} / Artista: ${this.winningTrack.track.artists[0].name}`;
      this.albumImageUrl = this.winningTrack.track.album.images[0].url;
      this.hintButtonDisabled = true;
    }
    this.turn += 1;
    this.limitTime += 4;
  }

  updatePoints() {
    if (this.turn === 1) {
      this.points -= 5;
    } else if (this.turn === 2) {
      this.points -= 15;
    } else if (this.turn === 3) {
      this.points -= 30;
    }
  }

  handleOptionClick(selectedTrack: any) {
    //const correctSound = document.getElementById('winSound') as HTMLAudioElement;
    const wrongSound = document.getElementById('loseSound') as HTMLAudioElement;
    const loseModal = document.getElementById('loseModal');
    if (selectedTrack === this.winningTrack) {
      // alert('¡Ganaste!');
      // correctSound.play();
      this.points += 100;
      this.updatePoints();
      console.log(this.points);
      this.newGame();
    } else {
      //alert('Perdiste, La canción era: " ' + this.winningTrack.track.name + ' "' + '/Tus puntos son: ' + this.points);
      this.onAddLeader();
      if (loseModal) {
        loseModal.style.display = 'block';
      }
      wrongSound.play();
      this.disableOptions();
      this.win = false;
      this.alert = true;
    }

  }

  leaderboardData: any;

  getTheLeaderboard() {
    this.user_service.getAllLeaderboard().subscribe(LeaderboardData => {
      this.leaderboardData = LeaderboardData;
      console.log(this.leaderboardData);
    });
  }


  onAddLeader() {
    const userId = JSON.parse(localStorage.getItem('userData') || '{}').id;

    if (this.points !== 0) {
      const leaderToSave = {
        user: {
          id: userId
        },
        points: this.points
      };

      this.user_service.addToLeader(leaderToSave).subscribe(data => {
      });
    } else {
      console.log("Los puntos fueron 0 ni lo agrego");
    }
  }


  disableOptions() {
    this.hintButtonDisabled = true;
    this.songsButtonDisabled = true;
    const audioPlayer: HTMLAudioElement = document.getElementById('audioPlayer') as HTMLAudioElement;
    audioPlayer.pause();
    this.limitTime = 0;
  }

  newGame() {
    this.getTheLeaderboard();

    if (this.win === false) {
      this.points = 0;
    }

    this.playTheGame();
    this.hintMessage = '';
    this.albumImageUrl = '';
    this.turn = 0;
    this.limitTime = 4;
  }

  getRandomSongsFromPlaylist(playlist: any[], count: number): any[] {

    if (!playlist || playlist.length === 0) {
      console.error('La playlist no contiene canciones.');
      return [];
    }

    const randomSongs: any[] = [];
    const totalSongs = playlist.length;

    if (totalSongs <= count) {
      return playlist;
    }

    const selectedIndices: number[] = [];

    while (randomSongs.length < count) {
      const randomIndex = Math.floor(Math.random() * totalSongs);
      const selectedSong = playlist[randomIndex];
      if (
        !selectedIndices.includes(randomIndex) && selectedSong.track.preview_url
      ) {
        selectedIndices.push(randomIndex);
        randomSongs.push(selectedSong);
      }
    }

    return randomSongs;
  }

}
