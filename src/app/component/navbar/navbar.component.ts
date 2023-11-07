import { Component } from '@angular/core';
import { SpotifyService } from '../../service/spotify.service';
import { environment } from 'src/environments/environment.development';
import { UsersDataService } from 'src/app/service/user_data/users-data.service';
import { UserData } from 'src/app/models/user-data';
import { ViewChild } from '@angular/core';

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

  constructor(private service: SpotifyService, private user_service: UsersDataService) {
    environment.token = JSON.parse(localStorage.getItem('token') || '{}');
    environment.token = JSON.parse(localStorage.getItem('userData') || '{}');

  }

 
  deleteUserById() {

    const userId = JSON.parse(localStorage.getItem('userData') || '{}').id;

    this.user_service.deleteUser(userId).subscribe(response => {
      console.log('Usuario eliminado con éxito', response);
    }, error => {
      console.error('Error al eliminar usuario:', error.error);
    });
  }

  deleteFriendsById() {

    const userId = JSON.parse(localStorage.getItem('userData') || '{}').id;

    this.user_service.getFriendsById(userId).subscribe(myFriendsData => {

      console.log(myFriendsData);

      if (Array.isArray(myFriendsData)) {
        myFriendsData.forEach(friendData => {
          const friendId = friendData.user2.id;
          const friendshipIdUser1 = friendData.id_friend;

          this.user_service.getFriendsById(friendId).subscribe(friendFriendsData => {

            if (Array.isArray(friendFriendsData) && friendFriendsData.length > 0) {

              const friendshipIdUser2 = friendFriendsData[0].id_friend;

              if (this.checkIfMutualFriend(friendFriendsData, userId)) {
                console.log(friendFriendsData);
                this.user_service.deleteFriend(friendshipIdUser1).subscribe(response => {
                  console.log(`Amigo con ID ${friendshipIdUser1} eliminado correctamente.`);
                }, error => {
                  console.error(`Error al eliminar amigo con ID ${friendshipIdUser1}: ${error}`);
                });
                this.user_service.deleteFriend(friendshipIdUser2).subscribe(response => {
                  console.log(`Amigo con ID ${friendshipIdUser2} eliminado correctamente.`);
                }, error => {
                  console.error(`Error al eliminar amigo con ID ${friendshipIdUser2}: ${error}`);
                });
              } else {
                this.user_service.deleteFriend(friendshipIdUser1).subscribe(response => {
                  console.log(`Amigo con ID ${friendshipIdUser1} eliminado correctamente.`);
                }, error => {
                  console.error(`Error al eliminar amigo con ID ${friendshipIdUser1}: ${error}`);
                });
              }
            }
          });
        });
      }
    });
    this.showContinueButton = true;
    this.hintDeleteButton = false;
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


