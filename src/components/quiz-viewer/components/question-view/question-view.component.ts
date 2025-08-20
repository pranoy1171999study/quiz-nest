import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McqViewComponent } from "./mcq-view/mcq-view.component";
import { MsqViewComponent } from "./msq-view/msq-view.component";
import { TrueFalseViewComponent } from "./true-false-view/true-false-view.component";
import { QuizQuestion } from '../../../../core/models/question-models';
import { QuestionType } from '../../../../core/models/enums';

@Component({
  selector: 'app-question-view',
  imports: [CommonModule, McqViewComponent, MsqViewComponent, TrueFalseViewComponent],
  templateUrl: './question-view.component.html',
  styleUrl: './question-view.component.css',
  standalone: true
})
export class QuestionViewComponent {
  @Input() question:QuizQuestion|null = null;
  @Input() showResult: boolean = true;
  @Output() onQuestionSubmit:EventEmitter<boolean> = new EventEmitter();

  QuestionType = QuestionType;
  
}
