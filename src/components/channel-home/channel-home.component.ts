import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelSelectComponent } from "./components/channel-select/channel-select.component";
import { Channel } from '../../core/models/channel-models';
import { ChannelViewComponent } from "./components/channel-view/channel-view.component";
import { ChannelCreateComponent } from "./components/channel-create/channel-create.component";

export enum ChannelMode{
  CREATE, VIEW, EDIT
}
@Component({
  selector: 'app-channel-home',
  imports: [CommonModule, ChannelSelectComponent, ChannelViewComponent, ChannelCreateComponent],
  templateUrl: './channel-home.component.html',
  styleUrl: './channel-home.component.css',
  standalone: true
})
export class ChannelHomeComponent {
  readonly ChannelMode = ChannelMode;
  channelData: Channel | null = null;
  mode:ChannelMode = ChannelMode.VIEW;

  createRequest() {
    this.channelData = null;
    this.mode = ChannelMode.CREATE;
  }
  viewRequest(channel: Channel) {
    this.channelData = channel;
    this.mode = ChannelMode.VIEW;
  }
}
