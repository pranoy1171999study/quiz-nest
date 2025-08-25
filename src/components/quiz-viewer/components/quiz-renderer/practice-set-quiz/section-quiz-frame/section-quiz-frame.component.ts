import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizSection } from '../../../../../../core/models/quiz-models';
import { SectionQuizLpanelComponent } from "./section-quiz-lpanel/section-quiz-lpanel.component";
import { SectionQuizMiddlePanelComponent } from "./section-quiz-middle-panel/section-quiz-middle-panel.component";

@Component({
  selector: 'app-section-quiz-frame',
  imports: [CommonModule, SectionQuizLpanelComponent, SectionQuizMiddlePanelComponent],
  templateUrl: './section-quiz-frame.component.html',
  styleUrl: './section-quiz-frame.component.css',
  standalone: true
})
export class SectionQuizFrameComponent {
  @Input() sectionData:QuizSection|null = null;
  @Output() onSubmit:EventEmitter<void> = new EventEmitter();

  
  onSectionSubmit(){
    this.onSubmit.emit();
  }
}
