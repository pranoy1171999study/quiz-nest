import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MediaSelectImageComponent } from "../media-select-pages/media-select-image/media-select-image.component";
import { MediaSelectVideoComponent } from "../media-select-pages/media-select-video/media-select-video.component";
import { MediaSelectYoutubeComponent } from "../media-select-pages/media-select-youtube/media-select-youtube.component";
import { MediaSelectLatexComponent } from "../media-select-pages/media-select-latex/media-select-latex.component";
import { MediaSelectTextComponent } from "../media-select-pages/media-select-text/media-select-text.component";
import { MediaType } from '../../../../../core/models/enums';
import { HtmlMedia, LatexMedia, MediaItem } from '../../../../../core/models/media-models';

@Component({
  selector: 'app-media-selector-popup',
  standalone: true,
  imports: [CommonModule, MediaSelectImageComponent, MediaSelectVideoComponent, MediaSelectYoutubeComponent, MediaSelectLatexComponent, MediaSelectTextComponent],
  templateUrl: './media-selector-popup.component.html',
  styleUrls: ['./media-selector-popup.component.css']
})
export class MediaSelectorPopupComponent {
  allowedMediaTypes: MediaType[] = [];
  MediaType = MediaType;
  isSidebarOpen = true;
  selectedMediaType: MediaType = MediaType.IMAGE;
  selectedMedia: any = null;




  constructor(
    public dialogRef: MatDialogRef<MediaSelectorPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      allowedMedia: MediaType[]
      mediaElement: MediaItem | null
    }
  ) {
    if (!this.data.allowedMedia || this.data.allowedMedia.length === 0) {
      this.allowedMediaTypes = Object.values(MediaType);
    } else {
      this.allowedMediaTypes = data.allowedMedia;
    }
    if(this.allowedMediaTypes.length > 0){
      this.selectedMediaType = this.allowedMediaTypes[0];
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  selectMedia(media: any) {
    this.selectedMedia = media;
  }

  confirmSelection() {
    this.dialogRef.close({ reason: 'selected', data: this.selectedMedia });
  }

  cancel() {
    this.dialogRef.close({ reason: 'closed' });
  }
  emitSelectedMedia(media: any) {
    this.dialogRef.close(media);
  }

  getLatexMedia(): LatexMedia | null {
    if (this.data.mediaElement?.type !== MediaType.LATEX) {
      return null;
    }
    return this.data.mediaElement as LatexMedia;
  }
  getTextMedia(): HtmlMedia | null {
    if (this.data.mediaElement?.type !== MediaType.HTML) {
      return null;
    }
    return this.data.mediaElement as HtmlMedia;
  }

}
