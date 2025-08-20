import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LatexMedia, MediaItem } from '../../../../../../core/models/media-models';
import { generateRandomUUID } from '../../../../../../services/utils';
import { MediaType } from '../../../../../../core/models/enums';

@Component({
  selector: 'app-media-select-latex',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './media-select-latex.component.html',
  styleUrl: './media-select-latex.component.css',
})
export class MediaSelectLatexComponent implements AfterViewInit {
  @Input() latexInput: LatexMedia | null = null;
  @Output() latexOutput = new EventEmitter<MediaItem>();

  @ViewChild('mathField') mathFieldRef!: ElementRef;

  ngOnInit(): void {
    if (!this.latexInput) {
      this.latexInput = {
        id: generateRandomUUID(),
        type: MediaType.LATEX,
        content: ''
      };
    }
    console.log(this.latexInput);
    
  }

  ngAfterViewInit(): void {
    // Set the initial value in math-field
    const mathField = this.mathFieldRef?.nativeElement;
    if (mathField && this.latexInput?.content) {
      mathField.setValue(this.latexInput.content);
    }
  }

  onMathInput(event: Event): void {
    const mathField = event.target as any;
    const value = mathField?.getValue?.();
    if (this.latexInput && value !== undefined) {
      this.latexInput.content = value;
    }
  }

  addLatex() {
    if (!this.latexInput) return;
    const newLatex: LatexMedia = {
      ...this.latexInput,
      id: generateRandomUUID()
    };
    this.latexOutput.emit(newLatex);
  }
}
