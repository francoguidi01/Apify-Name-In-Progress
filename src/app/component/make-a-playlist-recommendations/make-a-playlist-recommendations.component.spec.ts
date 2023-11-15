import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeAPlaylistRecommendationsComponent } from './make-a-playlist-recommendations.component';

describe('MakeAPlaylistRecommendationsComponent', () => {
  let component: MakeAPlaylistRecommendationsComponent;
  let fixture: ComponentFixture<MakeAPlaylistRecommendationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakeAPlaylistRecommendationsComponent]
    });
    fixture = TestBed.createComponent(MakeAPlaylistRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
