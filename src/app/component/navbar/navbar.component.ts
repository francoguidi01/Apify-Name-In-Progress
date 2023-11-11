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


  checkIfMutualFriend(friendsData: any, userId: string) {
    if (Array.isArray(friendsData)) {
      for (let i = 0; i < friendsData.length; i++) {
        if (friendsData[i].user2.id === userId) {
          return true;
        }
      }
    }
    return false;
  }

  /* deleteFriendsById(userId: string) {
       this.user_service.getFriendsById(userId).subscribe(myFriendsData => {
         console.log(myFriendsData);
         if (Array.isArray(myFriendsData)) {
           myFriendsData.forEach(friendData => {
             const friendId = friendData.id_friend;
             this.user_service.deleteFriend(friendId).subscribe(response => {
             }, error => {
               //console.error(`Error al eliminar amigo con ID ${friendId}: ${error}`);
             });
           });
         } else {
           console.log('No hay más amigos para eliminar.');
         }
       });
     }*/

  /*
 deleteSongsById(userId: string) {
   this.user_service.getSongById(userId).subscribe(mySongsData => {
     console.log(mySongsData);
     if (Array.isArray(mySongsData)) {
       mySongsData.forEach(songData => {
         const songId = songData.id_song;
         this.user_service.deleteSong(songId).subscribe(response => {
         }, error => {
           //console.error(`Error al eliminar cancion con ID ${songId}: ${error}`);
         });
       });
     } else {
       console.log('No hay más canciones para eliminar.');
     }
   });
 }

 deleteArtistById(userId: string) {
   this.user_service.getArtistById(userId).subscribe(myArtistData => {
     console.log(myArtistData);
     if (Array.isArray(myArtistData)) {
       myArtistData.forEach(artistData => {
         const artistId = artistData.id_artist;
         this.user_service.deleteArtist(artistId).subscribe(response => {
         }, error => {
           //console.error(`Error al eliminar artista con ID ${artistId}: ${error}`);
         });
       });
     } else {
       console.log('No hay más artistas para eliminar.');
     }
   });
 }

 deleteLeaderboardById(userId: string) {
   this.user_service.getLeaderboardById(userId).subscribe(myLeaderboardData => {
     console.log(myLeaderboardData);
     if (Array.isArray(myLeaderboardData)) {
       myLeaderboardData.forEach(leaderboardData => {
         const leaderboardId = leaderboardData.id_leaderboard;
         this.user_service.deleteLeaderboard(leaderboardId).subscribe(response => {
         }, error => {
           //console.error(`Error al eliminar artista con ID ${artistId}: ${error}`);
         });
       });
     } else {
       console.log('No hay más artistas para eliminar.');
     }
   });
 }
 */
}


