import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizEditorComponent } from '../quiz-editor/quiz-editor.component';
import { FormsModule } from '@angular/forms';
import { MediaItem } from '../../../core/models/media-models';
import { MatDialog } from '@angular/material/dialog';
import { MediaSelectorPopupComponent } from '../components/media/media-selector-popup/media-selector-popup.component';
import { QuizHelperService } from '../quiz-helper-service';
import { TooltipService } from '../../../services/tooltip-service';
import { generateRandomUUID } from '../../../services/utils';
import { HtmlViewerComponent } from "../../shared/html-viewer/html-viewer.component";
import { MediaType, QuizType } from '../../../core/models/enums';
import { BaseQuiz, GameQuiz, PracticeSetQuiz, QuizItem, QuizSection } from '../../../core/models/quiz-models';
import { QuizQuestion } from '../../../core/models/question-models';

@Component({
  selector: 'app-quiz-home',
  standalone: true,
  imports: [CommonModule, FormsModule, QuizEditorComponent, HtmlViewerComponent],
  templateUrl: './quiz-home.component.html',
  styleUrls: ['./quiz-home.component.css'],
})
export class QuizHomeComponent implements OnInit {
  QuizType = QuizType;
  ToolTips: any = null;
  private readonly DRAFT_KEY = 'quizDraft';
  quiz: BaseQuiz = {
    id: generateRandomUUID(),
    title: '',
    description: '',
    type: QuizType.GAME,
    createdBy: '',
    createdAt: new Date(),
    isActive: true,
    startingPage: null
  };

  // Always at least one section for GAME
  sections: QuizSection[] = [
    {
      id: generateRandomUUID(),
      title: 'Default Section',
      description: '',
      disclaimer: null,
      questions: []
    }
  ];

  quizTypes = Object.values(QuizType);

  constructor(public dialog: MatDialog, private quizHelperService: QuizHelperService, public tooltipService: TooltipService) {
    this.ToolTips = tooltipService.ToolTip;
  }

  ngOnInit() {
    const draft = localStorage.getItem(this.DRAFT_KEY);
    if (draft) {
      const { quiz, sections } = JSON.parse(draft);
      this.quiz = { ...this.quiz, ...quiz };
      this.sections = sections;
    }
  }
  public saveDraft() {
    localStorage.setItem(this.DRAFT_KEY, JSON.stringify({
      quiz: this.quiz,
      sections: this.sections
    }));
  }


  updateBase<K extends keyof BaseQuiz>(key: K, value: BaseQuiz[K]) {
    this.quiz = { ...this.quiz, [key]: value };
    if (key === 'type') {
      if (value === QuizType.GAME) {
        this.sections = [{
          id: Date.now().toString(),
          title: 'Default Section',
          description: '',
          disclaimer: null,
          questions: []
        }];
      } else {
        this.sections = [];
      }
    }
    this.saveDraft();
  }

  addSection() {
    if (this.quiz.type === QuizType.PRACTICE_SET) {
      this.sections.push({
        id: Date.now().toString(),
        title: '',
        description: '',
        disclaimer: null,
        questions: []
      });
      this.saveDraft();
    }
  }

  removeSection(id: string) {
    if (this.quiz.type === QuizType.PRACTICE_SET) {
      this.sections = this.sections.filter(s => s.id !== id);
      this.saveDraft();
    }
  }
  updateQuestions(sectionIndex: number, questions: QuizQuestion[]) {
    this.sections[sectionIndex].questions = questions;
    this.saveDraft();
  }



  saveQuiz() {
    if (this.quiz.type === QuizType.GAME) {
      const data: GameQuiz = { ...this.quiz, type: QuizType.GAME, questions: this.sections[0].questions };
      console.log('Saving GameQuiz', data);
      this.saveQuizApi(data);
    } else {
      const data: PracticeSetQuiz = { ...this.quiz, type: QuizType.PRACTICE_SET, sections: this.sections };
      console.log('Saving CBTQuiz', data);
      this.saveQuizApi(data);
    }
  }
  saveQuizApi(data:QuizItem){
    localStorage.setItem('quiz-testing', JSON.stringify({
      quiz: data,
    }));
    // localStorage.removeItem(this.DRAFT_KEY);
  }
  discardDraft() {
    localStorage.removeItem(this.DRAFT_KEY);
    this.quiz = {
      id: Date.now().toString(),
      title: '',
      description: '',
      type: QuizType.GAME,
      createdBy: '',
      createdAt: new Date(),
      isActive: true,
      startingPage: null
    };
    this.sections = [{
      id: Date.now().toString(),
      title: 'Default Section',
      description: '',
      disclaimer: null,
      questions: []
    }];
  }
  removeStartingPage() {
    this.quiz.startingPage = null;
    this.saveDraft();
  }
  removeDisclaimer(sectionIndex: number) {
    this.sections[sectionIndex].disclaimer = null;
    this.saveDraft();
  }

  openDisclaimerEditor(sectionIndex: number) {
    if (!this.sections || !this.sections[sectionIndex]) {
      console.warn('Section not found at index', sectionIndex);
      return;
    }

    this.openMediaSelector({
      currentMedia: this.sections[sectionIndex].disclaimer,
      allowedMedia: [MediaType.HTML],
      onSave: (media) => {
        this.sections[sectionIndex].disclaimer = media;
      }
    });
  }


  openMediaSelectorForStartingPage() {
    this.openMediaSelector({
      currentMedia: this.quiz.startingPage,
      allowedMedia: [MediaType.HTML],
      onSave: (media) => {
        this.quiz.startingPage = media;
      }
    });
  }

  openMediaSelector(options: {
    currentMedia?: any;
    allowedMedia: MediaType[];
    onSave: (media: any) => void;
  }) {
    const dialogRef = this.dialog.open(MediaSelectorPopupComponent, {
      data: {
        mediaElement: options.currentMedia,
        allowedMedia: options.allowedMedia
      },
      maxWidth: 'none',
      panelClass: 'media-dialog-size',
    });

    dialogRef.afterClosed().subscribe(media => {
      if (media) {
        options.onSave(media);
        this.saveDraft();
      }
    });
  }

  addStartButtonHtml() {
    return `
    <button
      style="
        position: absolute;
        left: 50%;
        bottom: 50px;
        transform: translateX(-50%);
      "
      class="px-4 py-2 w-28 rounded font-medium
             bg-green-500 text-white hover:bg-green-600 
             dark:bg-green-600 dark:hover:bg-green-700
             transition-colors">
      Start
    </button>
  `;
  }
  getSanitizeHtml(html: string) {
    return this.quizHelperService.getSafeHtml(html);
  }

}
