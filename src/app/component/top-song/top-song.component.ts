import { Component, ViewChild } from '@angular/core';
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
  averageText: string = '';
  averageCalculation: string = '';
  averageFlag: boolean = false;
  @ViewChild('magicButton1') magicButton1: any;
  @ViewChild('magicButton2') magicButton2: any;

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
    //  console.log(localTokenData);
    if (Object.keys(localTokenData).length !== 0) {
      this.token = localTokenData;
      this.service.getTopSongs(this.token, range, 5).subscribe(topSongs => {
        this.topSongs = topSongs;
        this.averageFlag = true;
        this.promedio_popularity();
      });
    } else {
      this.service.get_token().subscribe(token => {
        this.token = token;
        this.service.getTopSongs(this.token, range, 5).subscribe(topSongs => {
          this.topSongs = topSongs;
          this.averageFlag = true;
          this.promedio_popularity();
        });
      });
    }
  }

  show_promedio: boolean = false;
  promedio: number = 0;

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

      this.averageText = '';
      this.averageCalculation = '';

      if (this.promedio < 50) {
        this.averageText += 'No sos tan apegado a lo popular, sos mas tranqui. ';
      } else {
        this.averageText += 'Escuchas lo mismo que los demas, nada de especial. ';
      }

    } else {
      this.promedio = 0;
      this.show_promedio = false;
    }

    this.getAudioFeatures();
  }


  audioFeatures: any;


  getAudioFeatures() {
    if (this.topSongs) {
      let ids = '';

      this.topSongs.items.forEach((item: { id: String; }) => {
        ids += `,${item.id}`;
      });
      
      this.service.getAudioFeatures(this.token, ids).subscribe(audioFeatures => {
        this.audioFeatures = audioFeatures;
        this.getAudioStats();
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

      audioFeaturesWithoutNull.forEach((song: { acousticness: any; danceability: any; liveness: any; energy: any; instrumentalness: any; }) => {
        sum_acousticness += song.acousticness;
        sum_danceability += song.danceability;
        sum_liveness += song.liveness;
        sum_energy += song.energy;
        sum_instrumentalness += song.instrumentalness;
      });

      this.averageCalculation += 'Tus canciones se acercan al ' + this.promedio.toFixed(2) + '% de lo que escucha la gente. ';
      this.averageCalculation += 'Además, son un ' + sum_acousticness.toFixed(2) + '% acústicas, ';
      this.averageCalculation += 'pero un ' + sum_instrumentalness.toFixed(2) + '% instrumentales y ';
      this.averageCalculation += 'un ' + sum_danceability.toFixed(2) + '% bailables, ';
      this.averageCalculation += 'un ' + sum_liveness.toFixed(2) + '% tocadas en vivo, ';
      this.averageCalculation += 'y un ' + sum_energy.toFixed(2) + '% enérgicas.';




      if (sum_acousticness < 10) {
        this.averageText += 'No sos muy fan de lo acústico ';
      } else {
        this.averageText += 'Te gusta mas lo que viene siendo lo acústico ';
      }

      if (sum_danceability < 10) {
        this.averageText += 'y parece que no te gusta mucho bailar aunque ';
      } else {
        this.averageText += 'y parece que te gusta mucho bailar aqunque ';
      }

      if (sum_liveness < 10) {
        this.averageText += 'disfrutas mas de la cancion si no esta tocada en vivo. ';
      } else {
        this.averageText += 'disfrutas mas de la cancion si es tocada en vivo. ';
      }

      if (sum_energy < 10) {
        this.averageText += 'Lo que si preferis la música menos enérgica ';
      } else {
        this.averageText += 'Lo que si preferis la música mas enérgica ';
      }

      if (sum_instrumentalness < 10) {
        this.averageText += 'y todas las canciones que son pura letra.';
      } else {
        this.averageText += 'y todas las canciones que son pura instrumental.';
      }

    }
  }


  getAverage() {
    if (this.averageFlag === true) {
      this.magicButton1.nativeElement.click();
      this.averageFlag = false;
    } else {
      this.magicButton2.nativeElement.click();
    }
  }

}
