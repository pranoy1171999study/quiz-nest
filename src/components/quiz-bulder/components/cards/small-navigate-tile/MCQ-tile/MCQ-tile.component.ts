import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseQuestion, McqQuestion } from '../../../../../../core/models/question-models';

@Component({
  selector: 'app-mcq-tile',
  imports: [CommonModule],
  templateUrl: './MCQ-tile.component.html',
  styleUrl: './MCQ-tile.component.css',
  standalone: true
})
export class MCQTileComponent {
  @Input() question:BaseQuestion|null = null;
  getQuestion():McqQuestion{
    return this.question as McqQuestion;
  }
}
