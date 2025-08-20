import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaType } from '../../../../../core/models/enums';
import { ImageMedia, MediaItem, VideoMedia } from '../../../../../core/models/media-models';
import { generateRandomUUID } from '../../../../../services/utils';

@Component({
  selector: 'app-file-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-picker.component.html',
  styleUrl: './file-picker.component.css',
})
export class FilePickerComponent implements OnInit{
  @Input() fileType: MediaType | null = null;
  @Output() filesSelected = new EventEmitter<MediaItem>();
  acceptedTypes: string = "";
  selectedFiles: File[] = [];

  ngOnInit(): void {
   this.setAcceptedTypes();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
      const convertedMedia = this.getMediaItemFromSelectedFile() as MediaItem;
      if(convertedMedia){
        this.filesSelected.emit(convertedMedia);
      }
    }
  }
  private setAcceptedTypes(): void {
    switch (this.fileType) {
      case MediaType.IMAGE:
        this.acceptedTypes = 'image/*';
        break;
      case MediaType.VIDEO:
        this.acceptedTypes = 'video/*';
        break;
      default:
        this.acceptedTypes = '*/*';
        break;
    }
  }

  getMediaItemFromSelectedFile(): MediaItem | null {
    /**
     * Upload in db and handle later
     * now return demo object
     */
    const id = generateRandomUUID();
    const name = "sample name";

    if (this.fileType === MediaType.IMAGE) {
      return {
        id,
        name,
        type: MediaType.IMAGE,
        url: "https://api.backlinko.com/app/uploads/2024/07/reverse-image-search-blog-post-image.webp",
        altText: "Alt text"
      } as ImageMedia;
    }

    if (this.fileType === MediaType.VIDEO) {
      return {
        id,
        name,
        type: MediaType.VIDEO,
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnailUrl: "images/ForBiggerBlazes.jpg"
      } as VideoMedia;
    }

    return null;
  }

}
