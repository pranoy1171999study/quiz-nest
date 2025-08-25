import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartingPageComponent } from "../../starting-page/starting-page.component";
import { SectionStartingPageComponent } from "../../section-starting-page/section-starting-page.component";
import { SectionQuizFrameComponent } from "./section-quiz-frame/section-quiz-frame.component";
import { PracticeSetQuiz, QuizSection } from '../../../../../core/models/quiz-models';
import { HtmlMedia } from '../../../../../core/models/media-models';
export enum GameQuizPageType {
  /**
   * Branding start page of QUIZ
   */
  START_PAGE,
  /**
   * Branding start page of Section
   */
  SECTION_START_PAGE,
  /**
   * Render the section
   */
  SECTION_PAGE,
  /**
   * Last Page thanks & redirect to leaderboard
   */
  LAST_PAGE
}
@Component({
  selector: 'app-practice-set-quiz',
  imports: [CommonModule, StartingPageComponent, SectionQuizFrameComponent],
  templateUrl: './practice-set-quiz.component.html',
  styleUrl: './practice-set-quiz.component.css',
  standalone: true
})
export class PracticeSetQuizComponent {
  GameQuizPageType = GameQuizPageType;
  @Input() quizDetails: PracticeSetQuiz | null = null;
  @Input() previewMode: boolean = false;

  pages: {
    pageType: GameQuizPageType;
    data: null | string | HtmlMedia | QuizSection;
  }[] = [];

  currentPageIndex = 0;

  ngOnChanges() {
    if (this.quizDetails) {
      this.buildPages();
      this.goToPage(0);
    }
  }

  getHtmlMedia(media: any): HtmlMedia {
    return media as HtmlMedia;
  }
  getQuizSection(quizSection: any): QuizSection {
    return quizSection as QuizSection;
  }

  private buildPages() {
    if (!this.quizDetails) return;

    this.pages = [];

    // 1. Starting Page
    this.pages.push({
      pageType: GameQuizPageType.START_PAGE,
      data: this.quizDetails?.startingPage
    });

    // 2. Sections
    for (const sec of this.quizDetails.sections) {
      //Section Starting Page
      if (sec.disclaimer) {
        this.pages.push({
          pageType: GameQuizPageType.SECTION_START_PAGE,
          data: sec.disclaimer
        });
      }
      this.pages.push({
        pageType: GameQuizPageType.SECTION_PAGE,
        data: sec
      });
    }

    // 3. Last Page
    this.pages.push({
      pageType: GameQuizPageType.LAST_PAGE,
      data: null
    });
  }

  goToPage(index: number) {
    if (index < 0 || index >= this.pages.length) return;
    this.currentPageIndex = index;
    const page = this.pages[this.currentPageIndex];
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
}
