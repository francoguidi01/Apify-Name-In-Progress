import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  constructor(private httpClient: HttpClient) { }


  searchFriends(query: string) {
    return this.httpClient.get(environment.GET_ALL_USERS).pipe(
      map((users: any) =>
        users.filter((user: any) =>
          user.id.toLowerCase().includes(query.toLowerCase())
        )
      )
    );
  }

  getAllUsers() {
    return this.httpClient.get(environment.GET_ALL_USERS);
  }

  getAllLeaderboard() {
    return this.httpClient.get(environment.GET_ALL_LEADERBOARD);
  }

  getAllFriends() {
    return this.httpClient.get(environment.GET_ALL_FRIENDS);
  }

  getUserById(id: string) {
    return this.httpClient.get(environment.GET_USER_BY_ID + id);
  }

  getFriendsById(id: string) {
    return this.httpClient.get(environment.GET_FRIEND_BY_ID + id);
  }


  getSongById(id: string) {
    return this.httpClient.get(environment.GET_SONG_BY_ID + id);
  }

  getArtistById(id: string) {
    return this.httpClient.get(environment.GET_ARTIST_BY_ID + id);
  }
  getAllSongs() {
    return this.httpClient.get(environment.GET_ALL_SONGS);
  }

  deleteUser(id: string) {
    return this.httpClient.delete(environment.DELETE_USER_URL + id);
  }

  deleteFriend(id: string) {
    return this.httpClient.delete(environment.DELETE_FRIEND_URL + id);
  }

  deleteSong(id: string) {
    return this.httpClient.delete(environment.DELETE_SONGS_URL + id);
  }

  deleteArtist(id: string) {
    return this.httpClient.delete(environment.DELETE_ARTIST_URL + id);
  }

  deleteLeaderboard(id: string) {
    return this.httpClient.delete(environment.DELETE_LEADERBOARD_URL + id);
  }

  addUser(newData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(environment.ADD_USER_URL, newData, { headers });
  }

  addSongs(newData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(environment.ADD_SONG_URL, newData, { headers });
  }

  addArtist(newData: any) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(environment.ADD_ARTIST_URL, newData, { headers });
  }

  addToLeader(newData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(environment.ADD_TO_LEADER_URL, newData, { headers });
  }

  addNewFriend(newData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(environment.ADD_FRIEND_URL, newData, { headers });
  }

}
