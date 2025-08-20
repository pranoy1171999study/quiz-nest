import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizSection } from '../../../../../../core/models/quiz-models';

@Component({
  selector: 'app-section-quiz-frame',
  imports: [CommonModule],
  templateUrl: './section-quiz-frame.component.html',
  styleUrl: './section-quiz-frame.component.css',
  standalone: true
})
export class SectionQuizFrameComponent {
  @Input() sectionData:QuizSection|null = null;
}
