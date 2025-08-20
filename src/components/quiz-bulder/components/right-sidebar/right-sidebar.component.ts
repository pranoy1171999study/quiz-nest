import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizEditorBuilderService } from '../../quiz-editor/quiz-editor-service';
import { QuizType } from '../../../../core/models/enums';
import { ThemeSettingsComponent } from "./panels/theme-settings/theme-settings.component";
import { QuestionSettingsComponent } from "./panels/question-settings/question-settings.component";

export enum PanelType{
  QUESTION_SETTINGS = 'QUESTION_SETTINGS',
  THEME_SETTINGS = 'THEME_SETTINGS'
}

@Component({
  selector: 'app-right-sidebar',
  imports: [CommonModule, ThemeSettingsComponent, QuestionSettingsComponent],
  templateUrl: './right-sidebar.component.html',
  styleUrl: './right-sidebar.component.css',
  standalone:true
})
export class RightSidebarComponent {
  @Input() quizType:QuizType = QuizType.GAME;
  @Input() editorDiv:HTMLDivElement|null = null;
  public PanelType = PanelType;
  selectedPanel:PanelType = PanelType.QUESTION_SETTINGS;

  toggleFullScreen() {
    if(!this.editorDiv){
      return;
    }
    if (!document.fullscreenElement) {
      this.editorDiv.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

}
