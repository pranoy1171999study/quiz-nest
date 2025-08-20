import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameQuizFrameComponent } from './game-quiz-frame.component';

describe('GameQuizFrameComponent', () => {
  let component: GameQuizFrameComponent;
  let fixture: ComponentFixture<GameQuizFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameQuizFrameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameQuizFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
