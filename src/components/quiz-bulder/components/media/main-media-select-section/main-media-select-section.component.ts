import { Component, Input, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MediaSelectorPopupComponent } from '../media-selector-popup/media-selector-popup.component';
import { QuizEditorBuilderService } from '../../../quiz-editor/quiz-editor-service';
import { QuizHelperService } from '../../../quiz-helper-service';
import { MediaViewerComponent } from "../media-viewer/media-viewer.component";
import { MediaItem } from '../../../../../core/models/media-models';
import { MediaType } from '../../../../../core/models/enums';

@Component({
  selector: 'app-main-media-select-section',
  imports: [CommonModule, MediaViewerComponent],
  templateUrl: './main-media-select-section.component.html',
  styleUrl: './main-media-select-section.component.css',
  standalone: true
})
export class MainMediaSelectSectionComponent {

  constructor(private dialog: MatDialog,private viewContainerRef: ViewContainerRef,public quizBulderService:QuizEditorBuilderService,public quizHelperService:QuizHelperService){

  }

  openMediaSelectorBaseMedia(media:MediaItem|null|undefined) {
    if(media && (media?.type === MediaType.LATEX || media?.type === MediaType.HTML)){
      this.openMediaSelector(this.quizHelperService.getOriginalMediaFormat(media));
    }else{
      this.openMediaSelector(null);
    }
  }
  openMediaSelector(media:MediaItem|null) {
    const dialogRef = this.dialog.open(MediaSelectorPopupComponent, {
      data: { 
        mediaElement: media,
        allowedMedia: [MediaType.IMAGE,MediaType.LATEX,MediaType.HTML,MediaType.VIDEO,MediaType.YOUTUBE]
      },
      maxWidth: 'none',
      panelClass: 'media-dialog-size',
      viewContainerRef: this.viewContainerRef,
    });

    dialogRef.afterClosed().subscribe(media => {
      if(media){
        const selectedQuestion = this.quizHelperService.getOriginalQuestionFormat(this.quizBulderService.getSelectedQuestion());
        if(selectedQuestion){
          selectedQuestion.media = media;
          this.quizBulderService.triggerQuestionsChange();
        }
      }
    });
  }
}
