import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaViewerComponent } from "../media-viewer/media-viewer.component"; 
import { MediaType } from '../../../../../core/models/enums';
import { MediaSelectorPopupComponent } from '../media-selector-popup/media-selector-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { QuizEditorBuilderService } from '../../../quiz-editor/quiz-editor-service';
import { QuizHelperService } from '../../../quiz-helper-service';
import { BaseMedia, MediaItem } from '../../../../../core/models/media-models';

@Component({
  selector: 'app-option-media-select-section',
  imports: [CommonModule, MediaViewerComponent],
  templateUrl: './option-media-select-section.component.html',
  styleUrl: './option-media-select-section.component.css',
  standalone: true
})
export class OptionMediaSelectSectionComponent {
  @Input() media: MediaItem | null = null;
  @Output() mediaChange = new EventEmitter<MediaItem | null>();

  constructor(private dialog: MatDialog, public quizBulderService: QuizEditorBuilderService, public quizHelperService: QuizHelperService) {

  }

  openMediaSelectorBaseMedia(media: BaseMedia | null | undefined) {
    if (media && (media?.type === MediaType.LATEX || media?.type === MediaType.HTML)) {
      this.openMediaSelector(this.quizHelperService.getOriginalMediaFormat(media));
    } else {
      this.openMediaSelector(null);
    }
  }
  openMediaSelector(media: MediaItem | null) {
    const dialogRef = this.dialog.open(MediaSelectorPopupComponent, {
      data: {
        mediaElement: media,
        allowedMedia: [MediaType.IMAGE,MediaType.LATEX,MediaType.HTML]
      },
      maxWidth: 'none',
      panelClass: 'media-dialog-size'
    });

    dialogRef.afterClosed().subscribe((media: MediaItem | null) => {
      if (media) {
        this.media = media;
        this.mediaChange.emit(media);
      }
    });
  }
}
