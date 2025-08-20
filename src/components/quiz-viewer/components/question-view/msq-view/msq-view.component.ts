import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaViewFullscreenComponent } from "../../media-view-fullscreen/media-view-fullscreen.component";
import { FormsModule } from '@angular/forms';
import { MsqQuestion, QuizQuestion } from '../../../../../core/models/question-models';
import { QuestionType } from '../../../../../core/models/enums';

@Component({
  selector: 'app-msq-view',
  imports: [CommonModule, MediaViewFullscreenComponent, FormsModule],
  templateUrl: './msq-view.component.html',
  styleUrl: './msq-view.component.css',
  standalone: true
})
export class MsqViewComponent {
  optionLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  msqQuestion: MsqQuestion | null = null;
  @Input() showResult: boolean = false;
  @Input()
  set question(value: QuizQuestion | null) {
    if (value && value.type === QuestionType.MSQ) {
      this.msqQuestion = value as MsqQuestion;
    } else {
      this.msqQuestion = null;
    }
  }
  /**
   * Output the result also in boolean.
   */
  @Output() onQuestionSubmit: EventEmitter<boolean> = new EventEmitter();
  selectedOptionIds: string[] = [];
  questionSubmitted: boolean = false;

  onOptionChange(optionId: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      if (!this.selectedOptionIds.includes(optionId)) {
        this.selectedOptionIds.push(optionId);
      }
    } else {
      this.selectedOptionIds = this.selectedOptionIds.filter(id => id !== optionId);
    }
  }
  submitAnswer() {
    if (this.questionSubmitted) {
      return;
    }
    if (this.selectedOptionIds.length === 0) {
      return;
    }
    this.questionSubmitted = true;
    this.onQuestionSubmit.emit(this.evaluateAnswer());
  }
  evaluateAnswer(): boolean {
    if (!this.msqQuestion?.correctOptionIds || !this.selectedOptionIds) return false;
    //Check that selected matches exactly the correct set
    return this.msqQuestion.correctOptionIds.length === this.selectedOptionIds.length &&
      this.msqQuestion.correctOptionIds.every(id => this.selectedOptionIds.includes(id));
  }

}
