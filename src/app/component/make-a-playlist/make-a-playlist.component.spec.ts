import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeAPlaylistComponent } from './make-a-playlist.component';

describe('MakeAPlaylistComponent', () => {
  let component: MakeAPlaylistComponent;
  let fixture: ComponentFixture<MakeAPlaylistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakeAPlaylistComponent]
    });
    fixture = TestBed.createComponent(MakeAPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
