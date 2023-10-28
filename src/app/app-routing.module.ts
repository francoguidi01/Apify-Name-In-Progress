import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuessSongComponent } from './component/guess-song/guess-song.component';
import { MakeAPlaylistComponent } from './component/make-a-playlist/make-a-playlist.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  {path: 'guess-song', component: GuessSongComponent},
  {path: 'make-a-playlist', component: MakeAPlaylistComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
