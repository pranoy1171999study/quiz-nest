import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartingPageComponent } from "../../starting-page/starting-page.component";
import { GameQuizFrameComponent } from "./game-quiz-frame/game-quiz-frame.component";
import { GameQuiz } from '../../../../../core/models/quiz-models';
import { HtmlMedia, MediaItem } from '../../../../../core/models/media-models';
import { QuizQuestion } from '../../../../../core/models/question-models';

export enum GameQuizPageType {
  /**
   * Branding start page of QUIZ
   */
  START_PAGE,
  /**
   * Media or Question Text of any Question
   */
  QUESTION_MEDIA,
  /**
   * Now Show the main Question
   */
  MAIN_QUESTION,
  /**
   * Last Page thanks & redirect to leaderboard
   */
  LAST_PAGE
}

@Component({
  selector: 'app-game-quiz',
  imports: [CommonModule, StartingPageComponent, GameQuizFrameComponent],
  templateUrl: './game-quiz.component.html',
  styleUrl: './game-quiz.component.css',
  standalone: true
})
export class GameQuizComponent {
  GameQuizPageType = GameQuizPageType;
  @Input() quizDetails: GameQuiz | null = null;
  @Input() previewMode: boolean = false;

  pages: {
    pageType: GameQuizPageType;
    data: null | string | MediaItem | QuizQuestion;
    expiryMs: number; // -1 means no timer
  }[] = [];

  currentPageIndex = 0;
  timerRef: any = null;
  countdownRef: any = null;
  remainingTime = 0; // in seconds


  ngOnChanges() {
    if (this.quizDetails) {
      this.buildPages();
      this.goToPage(0);
    }
  }

  getHtmlMedia(media:any):HtmlMedia{
    return media as HtmlMedia;
  }
  getMediaItem(media:any):MediaItem{
    return media as MediaItem;
  }
  getQuizQuestion(question:any):QuizQuestion{
    return question as QuizQuestion;
  }

  private buildPages() {
    if (!this.quizDetails) return;

    this.pages = [];

    // 1. Starting Page
    this.pages.push({
      pageType: GameQuizPageType.START_PAGE,
      data: this.quizDetails?.startingPage,
      expiryMs: -1
    });

    // 2. Questions
    for (const q of this.quizDetails.questions) {
      if (q.media) {
        this.pages.push({
          pageType: GameQuizPageType.QUESTION_MEDIA,
          data: q.media,
          expiryMs: 10000 // 10 seconds
        });
      }
      this.pages.push({
        pageType: GameQuizPageType.MAIN_QUESTION,
        data: q,
        expiryMs: q.maxTimeSec === -1 ? -1 : (q.maxTimeSec || 30) * 1000
      });
    }

    // 3. Last Page
    this.pages.push({
      pageType: GameQuizPageType.LAST_PAGE,
      data: null,
      expiryMs: -1
    });
  }

  goToPage(index: number) {
    if (index < 0 || index >= this.pages.length) return;

    this.currentPageIndex = index;
    this.clearTimer();

    const page = this.pages[this.currentPageIndex];

    if (page.expiryMs > 0) {//&& !this.previewMode
      // Start countdown
      this.remainingTime = Math.ceil(page.expiryMs / 1000);

      this.countdownRef = setInterval(() => {
        this.remainingTime--;
        if (this.remainingTime <= 0) {
          this.nextPage();
        }
      }, 1000);
    }
  }


  nextPage() {
    this.goToPage(this.currentPageIndex + 1);
  }

  previousPage() {
    this.goToPage(this.currentPageIndex - 1);
  }

  skipPage() {
    this.nextPage();
  }

  private clearTimer() {
    if (this.timerRef) {
      clearTimeout(this.timerRef);
      this.timerRef = null;
    }
    if (this.countdownRef) {
      clearInterval(this.countdownRef);
      this.countdownRef = null;
    }
    this.remainingTime = 0;
  }

}