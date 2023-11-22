import { Component } from '@angular/core';
import { __values } from 'tslib';
@Component({
  selector: 'app-make-a-playlist',
  templateUrl: './make-a-playlist.component.html',
  styleUrls: ['./make-a-playlist.component.css']
})
export class MakeAPlaylistComponent {

showIcon1: boolean = true;
showIcon2: boolean = true;
showPlaylistCard: boolean = true;
showMasEscuchadosCard: boolean = true;
showRecommendedPlaylist: boolean = false;

toggleVisibility(card: string) {
  if (card == 'playlist') {
    this.showMasEscuchadosCard = false;
    this.showRecommendedPlaylist = true;
    this.showPlaylistCard = false;
    this.showIcon1 = false;
    this.showIcon2 = false;

  } else if (card == 'form') {
 //   this.showFormSection = true;
    this.showPlaylistCard = false;
    this.showMasEscuchadosCard = false;
    this.showIcon2 = false;
    this.showIcon1 = false;

  }
}


}

