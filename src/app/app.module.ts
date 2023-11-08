import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { GuessSongComponent } from './component/guess-song/guess-song.component';

import { HttpClientModule } from '@angular/common/http';
import { SpotifyService } from './service/spotify.service';
import { MakeAPlaylistComponent } from './component/make-a-playlist/make-a-playlist.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { SocialComponent } from './component/social/social.component';
import { MakeAPlaylistRecommendationsComponent } from './component/make-a-playlist-recommendations/make-a-playlist-recommendations.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GuessSongComponent,
    MakeAPlaylistComponent,
    LoginComponent,
    HomeComponent,
    SocialComponent,
    MakeAPlaylistRecommendationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  //ACA IRIA ESTE SERVICE SpotifyService
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
