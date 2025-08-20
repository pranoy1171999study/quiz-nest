import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaSelectVideoComponent } from './media-select-video.component';

describe('MediaSelectVideoComponent', () => {
  let component: MediaSelectVideoComponent;
  let fixture: ComponentFixture<MediaSelectVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaSelectVideoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaSelectVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
