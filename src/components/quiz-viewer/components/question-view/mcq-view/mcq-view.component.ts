import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaViewFullscreenComponent } from "../../media-view-fullscreen/media-view-fullscreen.component";
import { FormsModule } from '@angular/forms';
import { McqQuestion, QuizQuestion } from '../../../../../core/models/question-models';
import { QuestionType } from '../../../../../core/models/enums';

@Component({
  selector: 'app-mcq-view',
  imports: [CommonModule, MediaViewFullscreenComponent, FormsModule],
  templateUrl: './mcq-view.component.html',
  styleUrl: './mcq-view.component.css',
  standalone: true
})
export class McqViewComponent {
  optionLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  mcqQuestion: McqQuestion | null = null;

  @Input() autoSubmit: boolean = false;
  @Input() showResult: boolean = false;

  @Input()
  set question(value: QuizQuestion | null) {
    if (value && value.type === QuestionType.MCQ) {
      this.mcqQuestion = value as McqQuestion;
    } else {
      this.mcqQuestion = null;
    }
  }
  /**
   * Output the result also in boolean.
   */
  @Output() onQuestionSubmit:EventEmitter<boolean> = new EventEmitter();
  selectedOptionId:string|null = null;
  questionSubmitted:boolean = false;


  tryAutoSubmit(optId:string){
    if(this.autoSubmit){
      this.selectedOptionId = optId;
      this.submitAnswer();
    }
  }
  submitAnswer() {
    if(this.questionSubmitted){
      return;
    }
    if(!this.selectedOptionId || this.selectedOptionId.trim() === ''){
      return;
    }
    this.questionSubmitted = true;
    this.onQuestionSubmit.emit(this.evaluteAnswer());
  }
  evaluteAnswer():boolean{
    return this.mcqQuestion?.correctOptionId === this.selectedOptionId;
  }

}
