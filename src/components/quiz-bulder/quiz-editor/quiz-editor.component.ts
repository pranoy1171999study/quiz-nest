import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftSidebarComponent } from "../components/left-sidebar/left-sidebar.component";
import { RightSidebarComponent } from "../components/right-sidebar/right-sidebar.component";
import { MiddlePanelComponent } from "../components/middle-panel/middle-panel.component";
import { Subscription } from 'rxjs';
import { QuizEditorBuilderService } from './quiz-editor-service';
import { QuizType } from '../../../core/models/enums';
import { QuizQuestion } from '../../../core/models/question-models';


@Component({
  selector: 'app-quiz-editor',
  imports: [CommonModule, LeftSidebarComponent, RightSidebarComponent, MiddlePanelComponent],
  templateUrl: './quiz-editor.component.html',
  styleUrl: './quiz-editor.component.css',
  standalone: true
})
export class QuizEditorComponent implements OnInit, OnDestroy, OnChanges {
  @Input() quizType:QuizType = QuizType.GAME;
  @Input() questions: QuizQuestion[] = [];
  @Output() onChange: EventEmitter<QuizQuestion[]> = new EventEmitter<QuizQuestion[]>();

  private sub!: Subscription;
  isSidebarOpen = false;

  constructor(private quizService: QuizEditorBuilderService) { }

  ngOnInit() {
    this.sub = this.quizService.questions$.subscribe((q) => {
      this.questions = q as QuizQuestion[];
      console.log("Emitting datas");
      this.onChange.emit(this.questions);
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['questions'] && changes['questions'].currentValue) {
      const currentSelectedId = this.quizService.getSelectedQuestion()?.id;
      this.quizService.setQuestions(this.questions);
    }
  }
  onQuestionChange(newQuestions: QuizQuestion[]) {
    this.quizService.setQuestions(newQuestions);
    this.onChange.emit(newQuestions);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


}
