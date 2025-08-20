import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizHelperService } from '../../../quiz-bulder/quiz-helper-service';
import { SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { MathfieldElement } from 'mathlive';
import { HtmlViewerComponent } from "../../../shared/html-viewer/html-viewer.component";
import { MediaType } from '../../../../core/models/enums';
import { MediaItem } from '../../../../core/models/media-models';

@Component({
  selector: 'app-media-view-fullscreen',
  imports: [CommonModule, HtmlViewerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './media-view-fullscreen.component.html',
  styleUrl: './media-view-fullscreen.component.css',
  standalone: true
})
export class MediaViewFullscreenComponent implements OnInit, OnChanges {
  MediaType = MediaType;

  @Input() inputMedia: MediaItem | null | undefined = null;
  media: MediaItem | null = null;

  constructor(private quizHelperService: QuizHelperService) { }

  ngOnInit(): void {
    this.updateMedia();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputMedia']) {
      this.updateMedia();
    }
  }
  
  private updateMedia() {
    if (this.inputMedia === undefined) {
      this.media = null;
      return;
    }
    if (this.inputMedia) {
      this.media = this.quizHelperService.getOriginalMediaFormat(this.inputMedia);
      if (this.media?.type === MediaType.YOUTUBE) {
        this.getSafeUrl(this.media?.url);
      } else if (this.media?.type === MediaType.HTML) {
        this.getSafeHtml(this.media?.content);
      }
    } else {
      this.media = null;
    }
  }

  safeUrl: SafeResourceUrl | null = null;
  getSafeUrl(url: string): SafeResourceUrl {
    this.safeUrl = this.quizHelperService.getSafeUrlForYoutube(url);
    return this.safeUrl;
  }
  safeHtml: SafeHtml | null = null;
  getSafeHtml(content: string) {
    this.safeHtml = this.quizHelperService.getSafeHtml(content);
  }
}

