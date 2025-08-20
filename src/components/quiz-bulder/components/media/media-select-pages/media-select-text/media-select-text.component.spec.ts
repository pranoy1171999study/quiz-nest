import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaSelectTextComponent } from './media-select-text.component';

describe('MediaSelectTextComponent', () => {
  let component: MediaSelectTextComponent;
  let fixture: ComponentFixture<MediaSelectTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaSelectTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaSelectTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
