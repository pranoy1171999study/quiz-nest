import { Component, Input, OnInit, OnChanges, SimpleChanges, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizHelperService } from '../../../quiz-helper-service';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { MediaType } from '../../../../../core/models/enums';
import { MediaItem } from '../../../../../core/models/media-models';
import { HtmlViewerComponent } from "../../../../shared/html-viewer/html-viewer.component";

@Component({
  selector: 'app-media-viewer',
  standalone: true,
  imports: [CommonModule, HtmlViewerComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './media-viewer.component.html',
  styleUrl: './media-viewer.component.css'
})
export class MediaViewerComponent implements OnInit, OnChanges {
  MediaType = MediaType;

  @Input() inputMedia: MediaItem | null = null;
  media: MediaItem | null = null;

  constructor(private quizHelperService: QuizHelperService) {}

  ngOnInit(): void {
    this.updateMedia();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputMedia']) {
      this.updateMedia();
    }
  }

  private updateMedia() {
    if (this.inputMedia) {
      this.media = this.quizHelperService.getOriginalMediaFormat(this.inputMedia);
      if(this.media?.type === MediaType.YOUTUBE){
        this.getSafeUrl(this.media?.url);
      }else if(this.media?.type === MediaType.HTML){
        this.getSafeHtml(this.media?.content);
      }
    } else {
      this.media = null;
    }
  }

  safeUrl:SafeResourceUrl|null = null;
  getSafeUrl(url:string):SafeResourceUrl{
    this.safeUrl = this.quizHelperService.getSafeUrlForYoutube(url);
    return this.safeUrl;
  }
  safeHtml:SafeHtml|null = null;
  getSafeHtml(content:string){
    this.safeHtml = this.quizHelperService.getSafeHtml(content);
  }
}
