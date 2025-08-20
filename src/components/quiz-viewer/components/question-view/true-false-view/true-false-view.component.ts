import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaViewFullscreenComponent } from "../../media-view-fullscreen/media-view-fullscreen.component";
import { FormsModule } from '@angular/forms';
import { QuizQuestion, TrueFalseQuestion } from '../../../../../core/models/question-models';
import { QuestionType } from '../../../../../core/models/enums';

@Component({
  selector: 'app-true-false-view',
  imports: [CommonModule, MediaViewFullscreenComponent, FormsModule],
  templateUrl: './true-false-view.component.html',
  styleUrl: './true-false-view.component.css',
  standalone: true
})
export class TrueFalseViewComponent {
    tfQuestion: TrueFalseQuestion | null = null;
  
    @Input() autoSubmit: boolean = false;
    @Input() showResult: boolean = false;
  
    @Input()
    set question(value: QuizQuestion | null) {
      if (value && value.type === QuestionType.TrueFalse) {
        this.tfQuestion = value as TrueFalseQuestion;
      } else {
        this.tfQuestion = null;
      }
    }
    /**
     * Output the result also in boolean.
     */
    @Output() onQuestionSubmit:EventEmitter<boolean> = new EventEmitter();
    selectedOption:boolean|null = null;
    questionSubmitted:boolean = false;
  
  
    tryAutoSubmit(ans:boolean){
      if(this.autoSubmit){
        this.selectedOption = ans;
        this.submitAnswer();
      }
    }
    submitAnswer() {
      if(this.questionSubmitted){
        return;
      }
      if(!this.selectedOption){
        return;
      }
      this.questionSubmitted = true;
      this.onQuestionSubmit.emit(this.evaluteAnswer());
    }
    evaluteAnswer():boolean{
      return this.tfQuestion?.correctAnswer === this.selectedOption;
    }
}
