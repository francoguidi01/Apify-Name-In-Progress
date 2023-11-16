import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuessSongComponent } from './component/guess-song/guess-song.component';
import { MakeAPlaylistComponent } from './component/make-a-playlist/make-a-playlist.component';
import { HomeComponent } from './component/home/home.component';
import { SocialComponent } from './component/social/social.component';
import { OriginComponent } from './component/origin/origin.component';
import { UserStatsComponent } from './component/user-stats/user-stats.component';
import { MakeAPlaylistRecommendationsComponent } from './component/make-a-playlist-recommendations/make-a-playlist-recommendations.component';
import { MakeAPlaylistQuizComponent } from './component/make-a-playlist-quiz/make-a-playlist-quiz.component';
import { TopArtistComponent } from './component/top-artist/top-artist.component';
import { TopSongComponent } from './component/top-song/top-song.component';


const routes: Routes = [
  {path: '', component: OriginComponent},
  {path: 'guess-song', component: GuessSongComponent},
  {path: 'make-a-playlist', component: MakeAPlaylistComponent},
  {path: 'home', component: HomeComponent},
  {path: 'social',component: SocialComponent },
  {path: 'make-a-playlist/recommendations', component: MakeAPlaylistRecommendationsComponent},
  {path: 'make-a-playlist/quiz', component: MakeAPlaylistQuizComponent},
  {path: 'stats', component: UserStatsComponent},
  {path: 'stats/top-artist', component: TopArtistComponent},
  {path: 'stats/top-song', component: TopSongComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
