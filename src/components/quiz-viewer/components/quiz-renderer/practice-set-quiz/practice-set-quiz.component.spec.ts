import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PracticeSetQuizComponent } from './practice-set-quiz.component';

describe('PracticeSetQuizComponent', () => {
  let component: PracticeSetQuizComponent;
  let fixture: ComponentFixture<PracticeSetQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeSetQuizComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PracticeSetQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
