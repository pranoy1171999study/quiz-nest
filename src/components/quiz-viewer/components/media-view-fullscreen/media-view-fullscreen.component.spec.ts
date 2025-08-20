import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaViewFullscreenComponent } from './media-view-fullscreen.component';

describe('MediaViewFullscreenComponent', () => {
  let component: MediaViewFullscreenComponent;
  let fixture: ComponentFixture<MediaViewFullscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaViewFullscreenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaViewFullscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
