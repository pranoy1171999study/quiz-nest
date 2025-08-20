import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizEditorBuilderService } from '../../../quiz-editor/quiz-editor-service';
import { MsqQuestion } from '../../../../../core/models/question-models';
import { FormsModule } from '@angular/forms';
import { MainMediaSelectSectionComponent } from '../../media/main-media-select-section/main-media-select-section.component';
import { OptionMediaSelectSectionComponent } from "../../media/option-media-select-section/option-media-select-section.component";
import { QuizHelperService } from '../../../quiz-helper-service';

@Component({
  selector: 'app-msq-middle-panel',
  imports: [CommonModule, FormsModule, MainMediaSelectSectionComponent, OptionMediaSelectSectionComponent],
  templateUrl: './MSQ-middle-panel.component.html',
  styleUrl: './MSQ-middle-panel.component.css',
  standalone: true
})
export class MSQMiddlePanelComponent {
  constructor(public quizBuilderService: QuizEditorBuilderService, public quizHelperService:QuizHelperService) {

  }
  getSelectedQuestion(): MsqQuestion {
    return this.quizBuilderService.getSelectedQuestion() as MsqQuestion;
  }

  decideAndMakeSelectOptions(optionsArr: string[], clickedOpt: string): string[] {
    if (optionsArr.includes(clickedOpt)) {
      if (optionsArr.length == 1) {
        /**
         * You have to choose atleast one answeer 
         */
        return optionsArr;
      } else {
        return optionsArr.filter(op => op !== clickedOpt)
      }

    } else {
      optionsArr.push(clickedOpt);
      return [...optionsArr, clickedOpt];
    }

  }
}
