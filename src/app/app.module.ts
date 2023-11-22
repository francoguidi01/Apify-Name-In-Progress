import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { GuessSongComponent } from './component/guess-song/guess-song.component';

import { HttpClientModule } from '@angular/common/http';
import { MakeAPlaylistComponent } from './component/make-a-playlist/make-a-playlist.component';
import { HomeComponent } from './component/home/home.component';
import { SocialComponent } from './component/social/social.component';
import { OriginComponent } from './component/origin/origin.component';
import { MakeAPlaylistRecommendationsComponent } from './component/make-a-playlist-recommendations/make-a-playlist-recommendations.component';
import { MakeAPlaylistQuizComponent } from './component/make-a-playlist-quiz/make-a-playlist-quiz.component';
import { UserStatsComponent } from './component/user-stats/user-stats.component';
import { TopArtistComponent } from './component/top-artist/top-artist.component';
import { TopSongComponent } from './component/top-song/top-song.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GuessSongComponent,
    MakeAPlaylistComponent,
    HomeComponent,
    SocialComponent,
    OriginComponent,
    MakeAPlaylistRecommendationsComponent,
    MakeAPlaylistQuizComponent,
    UserStatsComponent,
    TopArtistComponent,
    TopSongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
