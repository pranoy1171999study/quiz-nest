import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaSelectLatexComponent } from './media-select-latex.component';

describe('MediaSelectLatexComponent', () => {
  let component: MediaSelectLatexComponent;
  let fixture: ComponentFixture<MediaSelectLatexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaSelectLatexComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaSelectLatexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
