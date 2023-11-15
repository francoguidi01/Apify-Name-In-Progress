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
  friends: any[] = [];
  followers: any[] = [];
  filteredFriends: any[] = [];
  selectedFriend: any;
  showFollowers: boolean = false;

  showComparison: boolean = false;
  showFollowButton: boolean = true;

  selectedUser: any = {
    friends: [],
    followers: []
  };

  userMusicData: any = {
    myArtists: [],
    friendArtists: [],
    mySongs: [],
    friendSongs: []
  };



  ngOnInit() {
    this.getMyFriends();
  }

  constructor(private service: SpotifyService, private user_service: UsersDataService) {
    environment.token = JSON.parse(localStorage.getItem('token') || '{}');
    environment.token = JSON.parse(localStorage.getItem('userData') || '{}');

  }

  searchFriends(event: any) {
    const query = event.target.value;
    if (query) {
      this.user_service.searchFriends(query).subscribe((filteredFriends: any) => {
        this.filteredFriends = filteredFriends;
      });
    } else {
      this.filteredFriends = [];
    }
  }

  isFriend(friend: any): boolean {
    const friendIds = this.friends.map(friend => friend.id);
    return friendIds.includes(friend.id);
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

  getMyFollowers() {
    const userId = JSON.parse(localStorage.getItem('userData') || '{}').id;

    this.user_service.getAllFriends().subscribe((friendsData: any) => {
      if (Array.isArray(friendsData)) {
        this.followers = friendsData.filter((friend: any) => friend.user2.id === userId).map((friend: any) => friend.user1); // Obtener solo el user1 de cada amistad
      } else {
        console.error('Error: friendsData no es un array');
      }
    });
  }



  onAddFriend(friendId: string) {
    const userId = JSON.parse(localStorage.getItem('userData') || '{}').id;

    const FriendToSave = {
      user1: {
        id: userId
      },
      user2: {
        id: friendId
      }
    };

    this.user_service.getFriendsById(userId).subscribe(myFriendsData => {
      if (Array.isArray(myFriendsData)) {
        this.friends = myFriendsData.map(friend => friend.user2);
        if (this.friends.some(friend => friend.id === friendId)) {
          console.log('El amigo ya está en tu lista de amigos.');
          return;
        } else {
          this.user_service.addNewFriend(FriendToSave).subscribe(data => {
            this.getMyFriends();
          });
        }
      } else {
        console.error('Error: myFriendsData no es un array');
      }
    });
  }

  getUserDetails(userId: string) {

    this.user_service.getFriendsById(userId).subscribe(myFriendsData => {
      if (Array.isArray(myFriendsData)) {
        this.selectedUser.friends = myFriendsData.map(friend => friend.user2);
        console.log("sigue a", this.selectedUser.friends);
      } else {
        console.error('Error: myFriendsData no es un array');
      }
    });

    this.user_service.getAllFriends().subscribe((friendsData: any) => {
      if (Array.isArray(friendsData)) {
        this.selectedUser.followers = friendsData.filter((friend: any) => friend.user2.id === userId).map((friend: any) => friend.user1);
        console.log("lo siguen", this.selectedUser.followers);
      } else {
        console.error('Error: friendsData no es un array');
      }
    });
  }

  selectedFriends(friend: any) {
    this.selectedFriend = friend;
    this.getUserDetails(friend.id);
  }


  unfollow(friendId: string) {
    const userId = JSON.parse(localStorage.getItem('userData') || '{}').id;

    this.user_service.getFriendsById(userId).subscribe(myFriendsData => {
      console.log(myFriendsData);

      if (Array.isArray(myFriendsData)) {
        myFriendsData.forEach(friendData => {
          console.log("frienddata", friendData);
          const currentFriendId = friendData.user2.id;

          if (currentFriendId === friendId) {
            this.user_service.deleteFriend(friendData.id_friend).subscribe(response => {
              console.log(`Amigo con ID ${friendData.id_friend} eliminado correctamente.`);
              this.getMyFriends();
            }, error => {
              console.error(`Error al eliminar amigo con ID ${friendData.id_friend}: ${error}`);
              this.getMyFriends();
            });
            console.log(`Unfollowing friend with ID: ${friendId}`);
            this.getMyFriends();
          }
        });
      }
    });
  }

  getArtistDataFromFriend(userId: string) {
    if (!userId) {
      console.error("El userId está vacío");
      return;
    } else {
      this.user_service.getArtistById(userId).subscribe(
        (friendArtistData: any) => {
          if (Array.isArray(friendArtistData) && friendArtistData.length > 0) {
            this.userMusicData.friendArtists = Array.isArray(friendArtistData) ? friendArtistData : [];
            this.getArtistsSong();
          } else {
            console.log("No hay artistas para el usuario");
          }
        }
      );
    }
  }

  getArtistsSong() {

    const token = JSON.parse(localStorage.getItem('token') || '{}');

    const arrayIds: Array<String> = []
    this.userMusicData.friendArtists.forEach((artist: { id_api_artists: string }) => {
      arrayIds.push(artist.id_api_artists);
    });

    this.service.getArtistsById(arrayIds, token).subscribe(
      (friendArtistData: any) => {
        console.log("Artistas amigo:", friendArtistData);
      });

  }


  getArtistDataFromMe() {
    const storedToken = JSON.parse(localStorage.getItem('token') || '{}');
    if (!storedToken) {
      console.error("El token del usuario almacenado en el local storage está vacío");
      return;
    } else {
      this.service.getTopArtists(storedToken).subscribe(
        (myArtistData: any) => {
          if (Array.isArray(myArtistData) && myArtistData.length > 0) {
            this.userMusicData.myArtists = Array.isArray(myArtistData) ? myArtistData : [];
            console.log("Mis artistas", myArtistData);
          } else {
            console.log("No hay artistas para el usuario");
          }
        }
      );
    }
  }


  getSongDataFromFriend(userId: string) {
    if (!userId) {
      console.error("El userId está vacío");
      return;
    } else {
      this.user_service.getSongById(userId).subscribe(
        (friendSongData: any) => {
          if (Array.isArray(friendSongData) && friendSongData.length > 0) {
            this.userMusicData.friendSongs = Array.isArray(friendSongData) ? friendSongData : [];
            this.getFriendsSong();
          } else {
            console.log("No hay canciones para el usuario");
          }
        }
      );
    }
  }

  getFriendsSong() {

    const token = JSON.parse(localStorage.getItem('token') || '{}');
    const arrayIds: Array<String> = []
    this.userMusicData.friendSongs.forEach((song: { id_api_songs: string }) => {
      arrayIds.push(song.id_api_songs);
    });

    this.service.getSongsById(arrayIds, token).subscribe(
      (friendSongsData: any) => {
        console.log("Canciones amigo:", friendSongsData);
      });

  }


  getSongDataFromMe() {
    const storedToken = JSON.parse(localStorage.getItem('token') || '{}');

    if (!storedToken) {
      console.error("El token del usuario almacenado en el local storage está vacío");
      return;
    } else {
      this.service.getTopSongs(storedToken, 5).subscribe(
        (mySongData: any) => {
          if (Array.isArray(mySongData) && mySongData.length > 0) {
            this.userMusicData.mySongs = Array.isArray(mySongData) ? mySongData : [];
            console.log("Mis canciones", mySongData);

          } else {
            console.log("No hay canciones para el usuario");
          }
        }
      );
    }
  }

  getSongsByTheUser(userId: string) {

    this.getSongDataFromFriend(userId);
    this.getSongDataFromMe();

  }

  getArtistByTheUser(userId: string) {

    this.getArtistDataFromFriend(userId);
    this.getArtistDataFromMe();

  }
  /*------------------SHOW FLAGS----------*/

  showComparisonOptions() {
    this.showComparison = true;
    this.showFollowButton = false;
  }

  hideComparisonOptions() {
    this.showComparison = false;
    this.showFollowButton = true;
  }

  toggleFollowers() {
    this.showFollowers = !this.showFollowers;
  }

}


