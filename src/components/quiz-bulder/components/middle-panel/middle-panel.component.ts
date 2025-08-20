import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MCQMiddlePanelComponent } from "./MCQ-middle-panel/MCQ-middle-panel.component";
import { MSQMiddlePanelComponent } from "./MSQ-middle-panel/MSQ-middle-panel.component";
import { TrueFalseMiddlePanelComponent } from "./TrueFalse-middle-panel/TrueFalse-middle-panel.component";
import { QuizEditorBuilderService } from '../../quiz-editor/quiz-editor-service';
import { QuestionType } from '../../../../core/models/enums';

@Component({
  selector: 'app-middle-panel',
  imports: [CommonModule, MCQMiddlePanelComponent, MSQMiddlePanelComponent, TrueFalseMiddlePanelComponent],
  templateUrl: './middle-panel.component.html',
  styleUrl: './middle-panel.component.css',
  standalone:true
})
export class MiddlePanelComponent {

  QuestionType = QuestionType;

  constructor(public quizBuilderService:QuizEditorBuilderService){

  }
}
