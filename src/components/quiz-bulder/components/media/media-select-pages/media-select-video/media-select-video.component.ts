import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilePickerComponent } from '../../file-picker/file-picker.component';
import { FileLinkSelectorComponent } from "../../file-link-selector/file-link-selector.component";
import { MediaSearchResultComponent } from "../../../cards/media-search-result/media-search-result.component";
import { MediaItem, VideoMedia } from '../../../../../../core/models/media-models';
import { generateRandomUUID } from '../../../../../../services/utils';
import { MediaType } from '../../../../../../core/models/enums';
import { demoMedias } from '../../../../../../core/models/demo-datas';

@Component({
  selector: 'app-media-select-video',
  imports: [CommonModule, FilePickerComponent, FileLinkSelectorComponent, MediaSearchResultComponent],
  templateUrl: './media-select-video.component.html',
  styleUrl: './media-select-video.component.css',
  standalone: true
})
export class MediaSelectVideoComponent {
  MediaType = MediaType;
  @Output() filesSelected = new EventEmitter<MediaItem>();

  preloadedVideos: VideoMedia[] = []

  ngOnInit(): void {
    this.preloadedVideos = demoMedias.videos as VideoMedia[];
  }
  selectVideo(media: MediaItem) {
    this.filesSelected.emit(media);
  }
  selectExistingVideo(media: VideoMedia){
    media.id = generateRandomUUID();
    this.filesSelected.emit(media);
  }
}
