import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Channel } from '../../../../core/models/channel-models';

@Component({
  selector: 'app-channel-view',
  imports: [CommonModule],
  templateUrl: './channel-view.component.html',
  styleUrls: ['./channel-view.component.css'],
  standalone: true
})
export class ChannelViewComponent {
  @Input() channel_data: Channel | null = null;
}
