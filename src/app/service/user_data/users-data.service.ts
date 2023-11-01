import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  constructor(private httpClient: HttpClient) { }


  // URL de la API ficticia (reemplaza con la URL de tu API real)
  apiUrl = "http://localhost:8080/user/get-all-users";
  allSongs = "http://localhost:8080/songs/get-all-songs";
  userById="http://localhost:8080/user/get-an-user/";
  songById="http://localhost:8080/songs/get-songs-by-user/";
  deleteUrl = "http://localhost:8080/user/delete/2"; // URL ficticia para eliminar (reemplaza con la URL real)
  addUrl = "http://localhost:8080/user/add"; // URL ficticia para agregar (reemplaza con la URL real)
  addSongUrl= "http://localhost:8080/songs/add-song";
  addArtistUrl= "http://localhost:8080/artists/add-artist";
  
  getAllUsers() {
    return this.httpClient.get(this.apiUrl);
  }

  getUserById(id: string) {
    const url = this.userById + id;
    return this.httpClient.get(url);
  }

  deleteUser() {
    return this.httpClient.delete(this.deleteUrl);
  }

  addUser(newData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(this.addUrl, newData, { headers });
  }

  addSongs(newData: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(this.addSongUrl, newData,{headers});
  }

  addArtist(newData: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(this.addArtistUrl, newData,{headers});
  }

  getSongById(id: string) {
    const url = this.songById + id;
    return this.httpClient.get(url);
  }


  getAllSongs() {
    return this.httpClient.get(this.allSongs);
  }
}
