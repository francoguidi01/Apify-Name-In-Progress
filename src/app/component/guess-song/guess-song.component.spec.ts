import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessSongComponent } from './guess-song.component';

describe('GuessSongComponent', () => {
  let component: GuessSongComponent;
  let fixture: ComponentFixture<GuessSongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuessSongComponent]
    });
    fixture = TestBed.createComponent(GuessSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
