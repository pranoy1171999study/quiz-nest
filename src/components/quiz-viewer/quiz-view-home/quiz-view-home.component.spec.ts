import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizViewHomeComponent } from './quiz-view-home.component';

describe('QuizViewHomeComponent', () => {
  let component: QuizViewHomeComponent;
  let fixture: ComponentFixture<QuizViewHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizViewHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizViewHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
