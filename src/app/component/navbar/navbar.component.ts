import { Component } from '@angular/core';
import { SpotifyService } from '../../service/spotify.service';
import { environment } from 'src/environments/environment.development';
import { UsersDataService } from 'src/app/service/user_data/users-data.service';
import { UserData } from 'src/app/models/user-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  leaderboardData: any;
  friends: any;
  songs: any;
  artist: any;
  all: boolean = false;

  showContinueButton: boolean = false;
  hintDeleteButton: boolean = true;

  userFromDatabase: any;
  userDataToSave: UserData = new UserData;

  constructor(private service: SpotifyService, private user_service: UsersDataService, private router: Router) {
    environment.token = JSON.parse(localStorage.getItem('token') || '{}');
    environment.token = JSON.parse(localStorage.getItem('userData') || '{}');

  }


  deleteUserById() {

    const userId = JSON.parse(localStorage.getItem('userData') || '{}').id;

    this.user_service.deleteUser(userId).subscribe(response => {
      console.log('Usuario eliminado con éxito', response);

    }, error => {
      console.error('Error al eliminar usuario:', error.error);
      this.router.navigate(['']);
    });
  }

  deleteFriendsById() {
    const userId = JSON.parse(localStorage.getItem('userData') || '{}').id;

    this.user_service.getAllFriends().subscribe(allFriendsData => {
      if (Array.isArray(allFriendsData)) {
        allFriendsData
          .filter(friendData => friendData.user1.id === userId || friendData.user2.id === userId)
          .forEach(filteredFriendData => {

            this.user_service.deleteFriend(filteredFriendData.id_friend
            ).subscribe(response => {
              console.log(`Amigo con ID ${filteredFriendData.id_friend
                } eliminado correctamente.`);
            }, error => {
              console.error(`Error al eliminar amigo con ID ${filteredFriendData.id_friend
                }: ${error}`);
            });
          });
      }

      this.showContinueButton = true;
      this.hintDeleteButton = false;
    });
  }

}


