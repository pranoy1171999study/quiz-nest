import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaSelectImageComponent } from './media-select-image.component';

describe('MediaSelectImageComponent', () => {
  let component: MediaSelectImageComponent;
  let fixture: ComponentFixture<MediaSelectImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaSelectImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaSelectImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
