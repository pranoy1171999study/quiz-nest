import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaSelectYoutubeComponent } from './media-select-youtube.component';

describe('MediaSelectYoutubeComponent', () => {
  let component: MediaSelectYoutubeComponent;
  let fixture: ComponentFixture<MediaSelectYoutubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaSelectYoutubeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaSelectYoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
