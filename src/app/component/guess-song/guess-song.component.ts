import { Component } from '@angular/core';
import { SpotifyService } from '../../service/spotify.service';


@Component({
  selector: 'app-guess-song',
  templateUrl: './guess-song.component.html',
  styleUrls: ['./guess-song.component.css']
})
export class GuessSongComponent {

  token: any;
  playlist: any;
  playlisturl = '';
  randomSongs: any[] = [];
  winningTrack: any;
  turn: number = 0;
  hintMessage: string = '';
  albumImageUrl: string = '';

  constructor(private service: SpotifyService) { }

  getThePlaylistForGuess(): void {
    this.service.get_token().subscribe(token => {
      this.token = token;
      this.service.getPlaylist(this.token, this.playlisturl).subscribe(playlist => {
        this.playlist = playlist;
        this.playTheGame();

        this.hintMessage = ''; 
        this.albumImageUrl = ''; 
        this.turn = 0;
      });
    });
  }

  playTheGame() {
    this.randomSongs = this.getRandomSongsFromPlaylist(this.playlist.tracks.items, 4);
    console.log('Canciones aleatorias:', this.randomSongs);

    const winningTrackIndex = Math.floor(Math.random() * 4);
     this.winningTrack = this.randomSongs[winningTrackIndex];
    console.log(this.winningTrack);

    const audioPlayer: HTMLAudioElement = document.getElementById('audioPlayer') as HTMLAudioElement;
    audioPlayer.src = this.winningTrack.track.preview_url;
    audioPlayer.play();

    
    let limitTime = 3;

    audioPlayer.addEventListener('timeupdate', () => {

      if (audioPlayer.currentTime >= limitTime) {
          audioPlayer.pause();
          audioPlayer.currentTime = 0;
      }
  });

}

showHint() {
  if (this.turn === 0) {
    this.hintMessage = `Año: ${this.winningTrack.track.album.release_date}`;
  } else if (this.turn === 1) {
    this.hintMessage = `Año: ${this.winningTrack.track.album.release_date} / Artista: ${this.winningTrack.track.artists[0].name}`;
  } else if (this.turn === 2) {
    this.hintMessage = `Año: ${this.winningTrack.track.album.release_date} / Artista: ${this.winningTrack.track.artists[0].name}`;
    this.albumImageUrl = this.winningTrack.track.album.images[0].url;
  }
  this.turn += 1;
}

handleOptionClick(selectedTrack: any) {
  if (selectedTrack === this.winningTrack) {
    alert('¡Ganaste!');
  } else {
    alert('Perdiste, La canción era: " ' + this.winningTrack.track.name + ' "');
  }
  this.newGame();
}

newGame()
{
  this.playTheGame();

  this.hintMessage = ''; 
  this.albumImageUrl = ''; 
  this.turn = 0;
}

  getRandomSongsFromPlaylist(playlist: any[], count: number): any[] {
    const randomSongs: any[] = [];
    const totalSongs = playlist.length;
    if (totalSongs <= count) {
      return playlist;
    }

    const selectedIndices: number[] = [];
    while (randomSongs.length < count) {
      const randomIndex = Math.floor(Math.random() * totalSongs);
      if (!selectedIndices.includes(randomIndex)) {
        selectedIndices.push(randomIndex);
        randomSongs.push(playlist[randomIndex]);
      }
    }

    return randomSongs;
  }
}
