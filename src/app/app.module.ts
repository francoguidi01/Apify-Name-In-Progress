import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { GuessSongComponent } from './component/guess-song/guess-song.component';

import { HttpClientModule } from '@angular/common/http';
import { SpotifyService } from './service/spotify.service';
import { MakeAPlaylistComponent } from './component/make-a-playlist/make-a-playlist.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GuessSongComponent,
    MakeAPlaylistComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  //ACA IRIA ESTE SERVICE SpotifyService
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }