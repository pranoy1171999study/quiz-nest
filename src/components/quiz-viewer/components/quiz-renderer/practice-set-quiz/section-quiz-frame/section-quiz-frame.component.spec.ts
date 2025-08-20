import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionQuizFrameComponent } from './section-quiz-frame.component';

describe('SectionQuizFrameComponent', () => {
  let component: SectionQuizFrameComponent;
  let fixture: ComponentFixture<SectionQuizFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionQuizFrameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionQuizFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
