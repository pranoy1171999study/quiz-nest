import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilePickerComponent } from "../../file-picker/file-picker.component";
import { MediaSearchResultComponent } from "../../../cards/media-search-result/media-search-result.component";
import { FileLinkSelectorComponent} from "../../file-link-selector/file-link-selector.component";
import { MediaType } from '../../../../../../core/models/enums';
import { ImageMedia, MediaItem } from '../../../../../../core/models/media-models';
import { demoMedias } from '../../../../../../core/models/demo-datas';
import { generateRandomUUID } from '../../../../../../services/utils';

@Component({
  selector: 'app-media-select-image',
  imports: [CommonModule, FilePickerComponent, MediaSearchResultComponent, FileLinkSelectorComponent],
  templateUrl: './media-select-image.component.html',
  styleUrl: './media-select-image.component.css',
  standalone: true
})
export class MediaSelectImageComponent implements OnInit{
  MediaType = MediaType;
  @Output() filesSelected = new EventEmitter<MediaItem>();
  preloadedImages:ImageMedia[] = []

  ngOnInit(): void {
      this.preloadedImages = demoMedias.images as ImageMedia[];
  }

  selectImage(media: MediaItem){
    this.filesSelected.emit(media);
  }

  selectExistingImage(media: ImageMedia){
    media.id = generateRandomUUID();
    this.filesSelected.emit(media);
  }


}
