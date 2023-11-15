import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeAPlaylistQuizComponent } from './make-a-playlist-quiz.component';

describe('MakeAPlaylistQuizComponent', () => {
  let component: MakeAPlaylistQuizComponent;
  let fixture: ComponentFixture<MakeAPlaylistQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakeAPlaylistQuizComponent]
    });
    fixture = TestBed.createComponent(MakeAPlaylistQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
