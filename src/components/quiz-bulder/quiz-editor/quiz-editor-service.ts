import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuizHelperService } from '../quiz-helper-service';
import { BaseQuestion, McqQuestion } from '../../../core/models/question-models';
import { QuestionType } from '../../../core/models/enums';
import { generateRandomUUID } from '../../../services/utils';

@Injectable({
  providedIn: 'root',
})
export class QuizEditorBuilderService {
  private questionsSubject = new BehaviorSubject<BaseQuestion[]>([]);
  questions$ = this.questionsSubject.asObservable();

  public selectedQuestion = new BehaviorSubject<BaseQuestion | null>(null);
  quizType$ = this.selectedQuestion.asObservable();

  constructor(public quizHelper: QuizHelperService) {
  }

  public triggerQuestionsChange(): void {
    const updated = [...this.questionsSubject.value];
    this.questionsSubject.next(updated);
  }

  setQuestions(updatedQuestions: BaseQuestion[]): void {
    this.questionsSubject.next(updatedQuestions);

    if (this.selectedQuestion && this.selectedQuestion.value && this.selectedQuestion.value.id) {
      const found = updatedQuestions.find(q => q.id === this.selectedQuestion.value?.id);
      if (found) {
        this.setSelectedQuestion(found);
      } else if (updatedQuestions.length > 0) {
        this.setSelectedQuestion(updatedQuestions[0]);
      }
    } else if (updatedQuestions.length > 0) {
      this.setSelectedQuestion(updatedQuestions[0]);
    }
  }

  // ---- Question Management ----

  setSelectedQuestion(question: BaseQuestion | null) {
    this.selectedQuestion.next(question);
  }

  getSelectedQuestion(): BaseQuestion | null {
    return this.selectedQuestion.value;
  }

  setSelectedQuestionType(type: QuestionType) {
    const current = this.selectedQuestion.value;
    if (current) {
      const newQuestion = this.quizHelper.createDummyQuestion(type) as BaseQuestion;
      newQuestion.id = current.id;

      const updatedQuestions = this.questionsSubject.value.map(q =>
        q.id === newQuestion.id ? newQuestion : q
      );

      this.questionsSubject.next(updatedQuestions);
      this.setSelectedQuestion(newQuestion);
    }
  }

  getSelectedQuestionType(): QuestionType | null {
    return this.selectedQuestion?.value?.type || null;
  }

  addQuestion(question: BaseQuestion) {
    const updated = [...this.questionsSubject.value, question];
    this.questionsSubject.next(updated);
    this.setSelectedQuestion(question);
  }

  getQuestions(): BaseQuestion[] {
    return this.questionsSubject.value;
  }

  clearQuestions() {
    this.questionsSubject.next([]);
    this.setSelectedQuestion(null);
  }

  removeQuestion(id: string) {
    const currentQuestions = this.questionsSubject.value;

    // If it's NOT the selected question → just delete
    if (id !== this.getSelectedQuestion()?.id) {
      this.questionsSubject.next(currentQuestions.filter(q => q.id !== id));
      return;
    }

    const index = currentQuestions.findIndex(q => q.id === id);

    // If only question
    if (currentQuestions.length === 1) {
      this.clearQuestions();
      return;
    }

    // Remove it
    const updatedQuestions = currentQuestions.filter(q => q.id !== id);
    this.questionsSubject.next(updatedQuestions);

    // Set new selected question
    if (index >= updatedQuestions.length) {
      this.setSelectedQuestion(updatedQuestions[updatedQuestions.length - 1]);
    } else {
      this.setSelectedQuestion(updatedQuestions[index]);
    }
  }

  // ---- Sample Question ----

  addNewSampleQuestion() {
    this.addQuestion(this.getSampleQuestion());
  }

  getSampleQuestion(): McqQuestion {
    return {
      id: generateRandomUUID(),
      questionText: 'What is the capital of France?',
      type: QuestionType.MCQ,
      options: [
        { id: 'a1', media: null },
        { id: 'a2', media: null },
        { id: 'a3', media: null },
        { id: 'a4', media: null },
      ],
      correctOptionId: 'a1',
    } as McqQuestion;
  }
}
