import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelApiService } from '../../../../services/channel-api-services';
import { Playlist } from '../../../../core/models/channel-models';
import { ShowImageService } from '../../../../services/showimage.service';
import { CreatePlaylistComponent } from '../create-playlist/create-playlist.component';
import { MatDialog } from '@angular/material/dialog';
import { EditPlaylistComponent } from '../edit-playlist/edit-playlist.component';
import { NotificationService } from '../../../../services/notification-service.service';
import { Toast, ToastrModule } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-view-channel-playlists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-channel-playlists.component.html',
  styleUrl: './view-channel-playlists.component.css',
})
export class ViewChannelPlaylistsComponent implements OnChanges {
  @Input() channelId?: string;
  @Output() create = new EventEmitter<Playlist>();
  @Output() view = new EventEmitter<Playlist>();

  playlists: Playlist[] = [];
  loading = true;
  defaultImage = 'https://placehold.co/200x120?text=Playlist';

  constructor(
    private channelApiService: ChannelApiService,
    public showImageService: ShowImageService,
    private dialog: MatDialog,
    private notification: NotificationService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['channelId'] && this.channelId) {
      console.log("ChannelId", this.channelId);

      this.loadPlaylists();
    }
  }

  async loadPlaylists() {
    if (this.channelId === undefined || this.channelId === null) {
      return;
    }
    this.loading = true;
    try {
      this.playlists = await this.channelApiService.getPlaylistsByChannel(this.channelId);
    } catch (e) {
      this.playlists = [];
      this.notification.error('Something went wrong while fetching playlists', 'Unable to load Playlists');
    } finally {
      this.loading = false;
    }
  }

  onView(playlist: Playlist) {
    this.view.emit(playlist);
  }

  createRequest() {
    const dialogRef = this.dialog.open(CreatePlaylistComponent, {
      maxWidth: 'none',
      maxHeight: '90vh',
      panelClass: 'channel-dialog-size',
      disableClose: true,
      data: this.channelId
    });

    dialogRef.afterClosed().subscribe((result: Playlist | null) => {
      if (result) {
        this.create.emit(result);
        this.loadPlaylists();
        this.notification.success('Channel Created Successfully');
      }
    });
  }

  editRequest(playlist: Playlist) {
    const dialogRef = this.dialog.open(EditPlaylistComponent, {
      maxWidth: 'none',
      maxHeight: '90vh',
      panelClass: 'channel-dialog-size',
      disableClose: true,
      data: playlist
    });

    dialogRef.afterClosed().subscribe((result: Playlist | null) => {
      if (result) {
        this.create.emit(result);
        this.loadPlaylists();
      }
    });
  }

  onDelete(playlist: Playlist) {
    if (!playlist.id) {
      return;
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { title: playlist.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && playlist.id) {
        this.channelApiService.deletePlaylist(playlist.id,playlist.coverImageUrl).then(()=>{
          this.loadPlaylists();
          this.notification.success("Playlist deleted");
        }).catch((err)=>{
          this.notification.error(err.message);
        });
      }
    });
  }




  success() {
    console.log("Success");
    this.notification.success("Success msg", "abc");
  }
  warn() {
    this.notification.warning("Warn msg");
  }
  error() {
    this.notification.error("Err msg");
  }
}
