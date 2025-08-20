import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Channel } from '../../../../core/models/channel-models';
import { ShowImageService } from '../../../../services/showimage.service';

@Component({
  selector: 'app-channel-view',
  imports: [CommonModule],
  templateUrl: './channel-view.component.html',
  styleUrls: ['./channel-view.component.css'],
  standalone: true
})
export class ChannelViewComponent {
  @Input() channel_data: Channel | null = null;
  @Output() onEditRequest = new EventEmitter<Channel|null>();

  constructor(public showImageService:ShowImageService){}

  onEditChannel(){
    this.onEditRequest.emit(this.channel_data);
  }
}
