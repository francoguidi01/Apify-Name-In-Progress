import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { UsersDataService } from 'src/app/service/user_data/users-data.service';
import { UserData } from 'src/app/models/user-data';
import { SpotifyService } from '../../service/spotify.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent {

  userFromDatabase: any;
  userDataToSave: UserData = new UserData;
  friends: any;

  constructor(private service: SpotifyService, private user_service: UsersDataService) {
    environment.token = JSON.parse(localStorage.getItem('token') || '{}');
    environment.token = JSON.parse(localStorage.getItem('userData') || '{}');

  }

  getMyFriends() {
    const userId = JSON.parse(localStorage.getItem('userData') || '{}').id;
    this.user_service.getFriendsById(userId).subscribe(myFriendsData => {
      if (Array.isArray(myFriendsData)) {
        this.friends = myFriendsData.map(friend => friend.user2);
        console.log(this.friends);
      } else {
        console.error('Error: myFriendsData no es un array');
      }
    });
  }


}
