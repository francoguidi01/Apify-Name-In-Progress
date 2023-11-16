import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/service/spotify.service';

@Component({
  selector: 'app-top-song',
  templateUrl: './top-song.component.html',
  styleUrls: ['./top-song.component.css']
})
export class TopSongComponent {
  token: any;
  topSongs: any;
  seccionAbierta: string | null = null;

  constructor(private service: SpotifyService) {

  }

  toggleSeccion(seccion: string, tiempo: string) {
    if (this.seccionAbierta === seccion) {
      this.seccionAbierta = null;
    } else {
      this.getTopSongs(tiempo);
      this.seccionAbierta = seccion;
    }
  }

  getTopSongs(range: String): void {
    const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');
    console.log(localTokenData);
    if (Object.keys(localTokenData).length !== 0) {
      this.token = localTokenData;
      this.service.getTopSongs(this.token, range, 5).subscribe(topSongs => {
        this.topSongs = topSongs;
      });
    } else {
      this.service.get_token().subscribe(token => {
        this.token = token;
        this.service.getTopSongs(this.token, range, 5).subscribe(topSongs => {
          this.topSongs = topSongs;
        });
      });
    }
  }

  show_promedio: boolean = false;
  promedio: number = 0;
  you_are_normie: string = '';

  promedio_popularity() {
    let sum_popularity = 0;
    if (this.topSongs.items.length > 0) {
      this.topSongs.items.forEach((item: { name: any; popularity: any; }) => {
        const song = item.name;
        const song_popularity = item.popularity;
        sum_popularity += song_popularity;
      });

      this.promedio = sum_popularity / this.topSongs.items.length;
      this.show_promedio = true;

      if (this.promedio < 50) {
        this.you_are_normie = 'No sos, bro tranqui';
        console.log(this.you_are_normie);
      } else {
        this.you_are_normie = '¡Aguante Ed Sheeran, ¿no?';
        console.log(this.you_are_normie);
      }
      console.log(this.promedio);

    } else {
      this.promedio = 0;
      this.show_promedio = false;
    }
  }
  audioFeatures: any;
  getAudioFeatures() {
    if (this.topSongs) {
      let ids = '';

      this.topSongs.items.forEach((item: { id: String; }) => {
        ids += `,${item.id}`;
      });
      console.log(ids);

      this.service.getAudioFeatures(this.token, ids).subscribe(audioFeatures => {
        this.audioFeatures = audioFeatures;
        console.log(this.audioFeatures);
      });
    }
  }

  getAudioStats() {

    if (this.audioFeatures) {
      let sum_acousticness = 0;
      let sum_danceability = 0;
      let sum_liveness = 0;
      let sum_energy = 0;
      let sum_instrumentalness = 0;
      const audioFeaturesWithoutNull = this.audioFeatures.audio_features.slice(1);
      console.log(audioFeaturesWithoutNull);
      audioFeaturesWithoutNull.forEach((song: { acousticness: any; danceability: any; liveness: any; energy: any; instrumentalness: any; }) => {
        sum_acousticness += song.acousticness;
        sum_danceability += song.danceability;
        sum_liveness += song.liveness;
        sum_energy += song.energy;
        sum_instrumentalness += song.instrumentalness;
      });
      console.log('Suma de acousticness:', sum_acousticness);
      console.log('Suma de danceability:', sum_danceability);
      console.log('Suma de liveness:', sum_liveness);
      console.log('Suma de energy:', sum_energy);
      console.log('Suma de instrumentalness:', sum_instrumentalness);

      if (sum_acousticness < 10) {
        console.log('no te gusta mucho lo acustico no?: acousticness');
      }
      if (sum_danceability < 10) {
        console.log('Parece que no te gusta mucho la música bailable: danceability.');
      }
      if (sum_liveness < 10) {
        console.log('No pareces ser fan de las actuaciones en vivo: liveness.');
      }
      if (sum_energy < 10) {
        console.log('Tu música no es muy enérgica: energy.');
      } else {
        console.log('te gusta el ruido eh: energy')
      }
      if (sum_instrumentalness < 10) {
        console.log('Parece que prefieres música vocal en lugar de instrumental.: instrumentalness');
      }
    }
  }

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
