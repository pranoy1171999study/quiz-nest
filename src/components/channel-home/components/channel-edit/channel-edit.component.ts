import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShowImageService } from '../../../../services/showimage.service';
import { Channel } from '../../../../core/models/channel-models';
import { ChannelApiService } from '../../../../services/channel-api-services';

@Component({
  selector: 'app-channel-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './channel-edit.component.html',
  styleUrls: ['./channel-edit.component.css']
})
export class ChannelEditComponent implements OnInit {
  @Input() channel!: Channel;
  @Output() onEditSuccessful = new EventEmitter<Channel>();

  avatarPreview: string | null = null;
  defaultAvatar = 'https://placehold.co/100x100?text=CH';

  keywordsInput: string = this.channel?.keywords?.length
    ? this.channel.keywords.join(',')
    : '';


  constructor(private channelApi: ChannelApiService) { }

  ngOnInit() {
    this.keywordsInput = this.channel?.keywords?.length
      ? this.channel.keywords.join(',')
      : '';
  }


  onAvatarSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = e => (this.avatarPreview = e.target?.result as string);
      reader.readAsDataURL(input.files[0]);
    }
  }

  applyKeywords() {
    if (this.keywordsInput.trim()) {
      this.channel.keywords = this.keywordsInput
        .split(',')
        .map(k => k.trim())
        .filter(k => k.length > 0);
    }
  }

  async onSubmit() {
    try {
      const { error } = await this.channelApi.updateChannel(this.channel);
      if (error) {
        console.error('Update failed:', error);
      } else {
        console.log('Channel updated successfully');
        this.onEditSuccess(this.channel);
      }
    } catch (err) {
      console.error('Unexpected error updating channel:', err);
    }
  }

  onEditSuccess(channel:Channel){
    this.onEditSuccessful.emit(channel);
  }
}