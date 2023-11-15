import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  constructor(private httpClient: HttpClient) { }


  // URL de la API ficticia (reemplaza con la URL de tu API real)
  apiUrl = "http://localhost:8080/user/get-all-users";

  allSongs = "http://localhost:8080/songs/get-all-songs";
  allLeader = "http://localhost:8080/leaderboard/get-leaderboard";
  AllFriends="http://localhost:8080/friends/get-all-friends";

  
  userById = "http://localhost:8080/user/get-an-user/";
  songById = "http://localhost:8080/songs/get-dto-songs-by-id/";
  artistById = "http://localhost:8080/artists/get-dto-artist-by-id/"
  leaderboardById = "http://localhost:8080/leaderboard/get-leaderboard-by-user/";
  getFriendById = "http://localhost:8080/friends/get-friends-by-user/";


  deleteUserUrl = "http://localhost:8080/user/delete/";
  deleteFriendUrl = "http://localhost:8080/friends/delete-friend/";
  deleteSongsUrl = "http://localhost:8080/songs/delete-song/";
  deleteArtistUrl = "http://localhost:8080/artists/delete-artist/";
  deleteLeaderboardUrl = "http://localhost:8080/leaderboard/delete-leaderboard-by-user/";

  addUrl = "http://localhost:8080/user/add";
  addSongUrl = "http://localhost:8080/songs/add-song";
  addArtistUrl = "http://localhost:8080/artists/add-artist";
  addToLeaderUrl = "http://localhost:8080/leaderboard/add-leaderboard";
  addFriendUrl = "http://localhost:8080/friends/add-friend";


  searchFriends(query: string) {
    return this.httpClient.get(this.apiUrl).pipe(
      map((users: any) =>
        users.filter((user: any) =>
          user.id.toLowerCase().includes(query.toLowerCase())
        )
      )
    );
  }

  getAllUsers() {

    return this.httpClient.get(this.apiUrl);
  }

  getAllLeaderboard() {
    return this.httpClient.get(this.allLeader);
  }

  getAllFriends() {
    return this.httpClient.get(this.AllFriends);
  }

  getUserById(id: string) {
    return this.httpClient.get(this.userById + id);
  }

  getFriendsById(id: string) {
    return this.httpClient.get(this.getFriendById + id);
  }

  getLeaderboardById(id: string) {
    return this.httpClient.get(this.leaderboardById + id);
  }


  getSongById(id: string) {
    return this.httpClient.get(this.songById + id);
  }

  getArtistById(id: string) {
    return this.httpClient.get(this.artistById + id);
  }
  getAllSongs() {
    return this.httpClient.get(this.allSongs);
  }

  deleteUser(id: string) {
    return this.httpClient.delete(this.deleteUserUrl + id);
  }

  deleteFriend(id: string) {
    return this.httpClient.delete(this.deleteFriendUrl + id);
  }

  deleteSong(id: string) {
    return this.httpClient.delete(this.deleteSongsUrl + id);
  }

  deleteArtist(id: string) {
    return this.httpClient.delete(this.deleteArtistUrl + id);
  }

  deleteLeaderboard(id: string) {
    return this.httpClient.delete(this.deleteLeaderboardUrl + id);
  }

  addUser(newData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(this.addUrl, newData, { headers });
  }

  addSongs(newData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(this.addSongUrl, newData, { headers });
  }

  addArtist(newData: any) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(this.addArtistUrl, newData, { headers });
  }

  addToLeader(newData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(this.addToLeaderUrl, newData, { headers });
  }

  addNewFriend(newData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(this.addFriendUrl, newData, { headers });
  }

}
