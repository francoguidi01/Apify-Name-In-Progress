import { Component } from '@angular/core';
import { SpotifyService } from '../service/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  token: any;
  followedArtist: any;
  
  constructor(private service: SpotifyService) { }

  /*loginSpotify(): void {    
    const client_id = 'a00cd5e5b4d34c1996b89d04beaa411a';
    
    const redirect_uri = "http://localhost:4200/guess-song";
    
    const api_uri = "https://accounts.spotify.com/authorize";
    
    const scope = [
      "user-follow-read", //(Accede a tus seguidores y a quién sigues)
      "user-read-playback-state", //(Lee el contenido que se está reproduciendo actualmente)
      "user-modify-playback-state", //(Controle la reproducción en sus clientes de Spotify)
      "user-read-private", //(Accede a los datos de tu suscripción)
      "user-read-email", //(Obtenga su dirección de correo electrónico real)
      "user-read-currently-playing", //(Lea el contenido que se reproduce actualmente.)
      "user-read-recently-played", //(Accede a tus elementos reproducidos recientemente)
      "user-top-read" //(Lee sus principales artistas y contenido)
    ];
    
    window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
      "%20")}&response_type=token&show_dialog=true`;
      
  }*/

  getAlgo(): void {
    const localtoken= JSON.parse(localStorage.getItem('token') || '{}');
    //this.service.get_token().subscribe(token => {
      //this.token = token;
      this.service.getFollowed(localtoken).subscribe(followedArtist => {
        this.followedArtist = followedArtist;
      });
   // });
 // }
}

}
