import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelSelectComponent } from "./components/channel-select/channel-select.component";
import { Channel } from '../../core/models/channel-models';
import { ChannelViewComponent } from "./components/channel-view/channel-view.component";
import { ChannelCreateComponent } from "./components/channel-create/channel-create.component";
import { ChannelEditComponent } from "./components/channel-edit/channel-edit.component";
import { ViewChannelPlaylistsComponent } from "../playlists/components/view-channel-playlists/view-channel-playlists.component";
import { MatDialog } from '@angular/material/dialog';

export enum ChannelMode {
  CREATE, VIEW, EDIT
}
@Component({
  selector: 'app-channel-home',
  imports: [CommonModule, ChannelSelectComponent, ChannelViewComponent, ViewChannelPlaylistsComponent],
  templateUrl: './channel-home.component.html',
  styleUrl: './channel-home.component.css',
  standalone: true
})
export class ChannelHomeComponent {
  readonly ChannelMode = ChannelMode;
  channelData: Channel | null = null;
  mode: ChannelMode = ChannelMode.VIEW;

  constructor(private dialog: MatDialog) {}

  createRequest() {
    const dialogRef = this.dialog.open(ChannelCreateComponent, {
      maxWidth: 'none',
      maxHeight: '90vh',
      panelClass: 'channel-dialog-size',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: Channel | null) => {
      if (result) {
        this.channelData = result;
        this.mode = ChannelMode.VIEW;
      }
    });
  }

  editRequest(channel: Channel | null) {
    const dialogRef = this.dialog.open(ChannelEditComponent, {
      maxWidth: 'none',
      maxHeight: '90vh',
      panelClass: 'channel-dialog-size',
      disableClose: true,
      data: channel
    });

    dialogRef.afterClosed().subscribe((updated: Channel | null) => {
      if (updated) {
        this.channelData = updated;
        this.mode = ChannelMode.VIEW;
      }
    });
  }

  viewRequest(channel: Channel) {
    this.channelData = channel;
    this.mode = ChannelMode.VIEW;
  }
  

  // createRequest() {
  //   this.channelData = null;
  //   this.mode = ChannelMode.CREATE;
  // }
  // viewRequest(channel: Channel) {
  //   this.channelData = channel;
  //   this.mode = ChannelMode.VIEW;
  // }
  // editRequest(channel: Channel | null) {
  //   this.channelData = channel;
  //   this.mode = ChannelMode.EDIT;
  // }
}
