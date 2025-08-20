import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseQuestion, TrueFalseQuestion } from '../../../../../../core/models/question-models';

@Component({
  selector: 'app-true-false-tile',
  imports: [CommonModule],
  templateUrl: './TrueFalse-tile.component.html',
  styleUrl: './TrueFalse-tile.component.css',
  standalone: true
})
export class TrueFalseTileComponent {
  @Input() question: BaseQuestion | null = null;
  getQuestion(): TrueFalseQuestion {
    return this.question as TrueFalseQuestion;
  }
}
