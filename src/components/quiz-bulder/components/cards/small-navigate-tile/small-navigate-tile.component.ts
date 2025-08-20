import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MCQTileComponent } from "./MCQ-tile/MCQ-tile.component";
import { MSQTileComponent } from './MSQ-tile/MSQ-tile.component';
import { TrueFalseTileComponent } from './TrueFalse-tile/TrueFalse-tile.component';
import { QuizEditorBuilderService } from '../../../quiz-editor/quiz-editor-service';
import { BaseQuestion } from '../../../../../core/models/question-models';
import { QuestionType } from '../../../../../core/models/enums';

@Component({
  selector: 'app-small-navigate-tile',
  templateUrl: './small-navigate-tile.component.html',
  styleUrl: './small-navigate-tile.component.css',
  standalone: true,
  imports: [
    CommonModule,
    MCQTileComponent,
    MSQTileComponent,
    TrueFalseTileComponent
  ],
})
export class SmallNavigateTileComponent {
  @Input() question: BaseQuestion | null = null;

  QuizType = QuestionType;

  constructor(public quizBuilderService: QuizEditorBuilderService) {

  }

  onRemoveClick(event: MouseEvent, id: string) {
    event.stopPropagation();
    this.quizBuilderService.removeQuestion(id);
  }


}
