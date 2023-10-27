import { Component } from '@angular/core';
import { SpotifyService } from '../service/spotify.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  token: any;
  followedArtist: any;
  
  constructor(private service: SpotifyService) { 
    this.token = JSON.parse(localStorage.getItem('token') || '{}');
  }

  getAlgo(): void {

    const localtoken= JSON.parse(localStorage.getItem('token') || '{}');
    
    console.log('local: ',localtoken);
    //this.service.get_token().subscribe(token => {
      //this.token = token;
      this.service.getFollowed(localtoken).subscribe(followedArtist => {
        this.followedArtist = followedArtist;
      });
   // });
 // }
}

}
