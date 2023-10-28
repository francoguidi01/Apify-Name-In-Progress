import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  constructor(private httpClient: HttpClient) { }


  // URL de la API ficticia (reemplaza con la URL de tu API real)
  apiUrl = "http://localhost:8080/user/get-all-users";
  deleteUrl = "http://localhost:8080/user/delete/2"; // URL ficticia para eliminar (reemplaza con la URL real)
  addUrl = "http://localhost:8080/user/add"; // URL ficticia para agregar (reemplaza con la URL real)
  addSongUrl= "http://localhost:8080/songs/add-song";

  getAllUsers() {
    return this.httpClient.get(this.apiUrl);
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


}
