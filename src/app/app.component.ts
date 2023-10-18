import { Component, Output } from '@angular/core';
import { SpotifyService } from './service/spotify.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'apify';
  token: any;
  playlist: any;

  constructor(private service: SpotifyService) { }

  ngOnInit(): void {
    this.service.get_token().subscribe(token => {
      this.token = token;
      //console.log('El token papucho: ', token);

      // Llama a getPlaylist dentro de la suscripción para asegurarte de tener el token
      this.service.getPlaylist(this.token).subscribe(playlist => {
        this.playlist = playlist;
        // console.log('Datos de la playlist:', playlist);

        //console.log('tu lenght es: ', this.playlist.tracks.items.length);

        //console.log('tu promedio de popularidad es: ', prom);




      });
    });


  }


//esto tendria que ser un model?
  show_promedio: boolean = false;
  promedio: number = 0;
  you_are_normie: string = '';

  promedio_popularity() {
    let sum_popularity = 0;
    this.playlist.tracks.items.forEach((item: { track: { name: any; popularity: any; }; }) => {
      const song = item.track.name;
      const song_popularity = item.track.popularity;
      sum_popularity += song_popularity;
    });
    if (this.playlist.tracks.items.length > 0) {
      this.promedio = sum_popularity / this.playlist.tracks.items.length;
      this.show_promedio = true;
      if(this.promedio<50)
      {
        this.you_are_normie='no sos, bro tranqui';
      }else
      {
        this.you_are_normie='ppfpfpfpf aguante ed sheeran no?'
      }
      console.log(this.promedio);
    } else {
      this.promedio = 0;
      this.show_promedio = false;
    }
  }
}
