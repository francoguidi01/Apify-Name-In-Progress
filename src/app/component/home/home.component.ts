import { Component } from '@angular/core';
import { SpotifyService } from '../../service/spotify.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {


  constructor(private service: SpotifyService) {
    environment.token = JSON.parse(localStorage.getItem('token') || '{}');
  }

  ngOnInit(): void {

    const localtoken = JSON.parse(localStorage.getItem('token') || '{}');
    
    console.log(localtoken);

}

}