import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaViewFullscreenComponent } from "../../../media-view-fullscreen/media-view-fullscreen.component";
import { QuestionViewComponent } from "../../../question-view/question-view.component";
import { MediaItem } from '../../../../../../core/models/media-models';
import { QuizQuestion } from '../../../../../../core/models/question-models';
import { RewardService } from '../../../../../../services/reward-service';

@Component({
  selector: 'app-game-quiz-frame',
  imports: [CommonModule, MediaViewFullscreenComponent, QuestionViewComponent],
  templateUrl: './game-quiz-frame.component.html',
  styleUrl: './game-quiz-frame.component.css',
  standalone: true
})
export class GameQuizFrameComponent {
  @Input() remainingTime: number = 0;
  @Input() media: null | MediaItem = null;
  @Input() question: null | QuizQuestion = null;
  @Input() showResult: boolean = true;

  @Output() previous: EventEmitter<void> = new EventEmitter();
  @Output() next: EventEmitter<void> = new EventEmitter();
  @Output() skip: EventEmitter<void> = new EventEmitter();

  constructor(private rewardService: RewardService) {

  }

  goPrevious() {
    this.previous.emit();
  }
  goNext() {
    this.next.emit();
  }
  skipToNext() {
    this.skip.emit();
  }

  onQuestionSubmit(res: boolean) {
    if (this.showResult) {
      if (res) {
        this.rewardService.correctAnswer();
      } else {
        this.rewardService.wrongAnswer();
      }
      setTimeout(() => {
        this.goNext();
      }, 3000);
    } else {
      this.goNext();
    }
  }
}
