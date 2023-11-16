import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/service/spotify.service';

@Component({
  selector: 'app-top-artist',
  templateUrl: './top-artist.component.html',
  styleUrls: ['./top-artist.component.css']
})
export class TopArtistComponent {

  token: any;
  topArtists: any;
  seccionAbierta: string | null = null;

  constructor(private service: SpotifyService) {

   }

   toggleSeccion(seccion: string, tiempo: string) {
    if (this.seccionAbierta === seccion) {
      this.seccionAbierta = null;
    } else {
      this.getTopArtists(tiempo);
      this.seccionAbierta = seccion;
    }
  }

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

}
