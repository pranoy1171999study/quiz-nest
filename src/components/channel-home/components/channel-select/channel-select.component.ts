import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Channel } from '../../../../core/models/channel-models';
import { ChannelApiService } from '../../../../services/channel-api-services';
import { ShowImageService } from '../../../../services/showimage.service';
import { AuthService } from '../../../auth/auth.service';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-channel-select',
  imports: [CommonModule],
  templateUrl: './channel-select.component.html',
  styleUrl: './channel-select.component.css',
  standalone: true
})
export class ChannelSelectComponent implements OnInit {
  @Output() create = new EventEmitter<void>();
  @Output() view = new EventEmitter<Channel>();
  skeletonArray: number[] = [];
  channels: Channel[] = [];
  loading: boolean = true;

  constructor(private channelApiService: ChannelApiService, public showImageService: ShowImageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadScaliton();

    this.authService.getUser().then((user: User | null) => {
      if (!user) {
        console.error('No logged in user');
        this.emitCreateChannel();
        return;
      }

      this.channelApiService.getChannelsForUser(user.id)
        .then((res) => {
          this.channels = res;
          if (this.channels && this.channels.length > 0) {
            this.selectChannel(this.channels[0]);
          } else {
            this.emitCreateChannel();
          }
          this.loading = false;
        })
        .catch((err) => {
          console.error(err);
          this.emitCreateChannel();
        });
    });
  }



  selectedChannelId: string | null | undefined = null;

  selectChannel(channel: Channel) {
    this.selectedChannelId = channel.id;
    this.emitViewChannel(channel);
  }
  emitViewChannel(channel: Channel) {
    this.view.emit(channel);
  }
  emitCreateChannel() {
    this.create.emit();
  }
  loadScaliton() {
    const screenWidth = window.innerWidth;
    const itemWidth = 120; // (w-20 + spacing approx px)
    const count = Math.ceil(screenWidth / itemWidth);
    this.skeletonArray = Array(count).fill(0);
  }

}
