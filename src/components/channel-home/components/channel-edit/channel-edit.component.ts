import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  channel!: Channel;
  originalChannel!: Channel; // keep a copy
  avatarPreview: string | null = null;
  selectedAvatarFile:File|null = null;
  defaultAvatar = 'https://placehold.co/100x100?text=CH';
  keywordsInput = '';

  constructor(
    private channelApi: ChannelApiService,
    private dialogRef: MatDialogRef<ChannelEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Channel // 👈 injected data
  ) {
    this.channel = { ...data }; // editable copy
    this.originalChannel = { ...data }; // backup copy
  }

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
      this.selectedAvatarFile = input.files[0];
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
  if (!this.channel?.id) {
    console.error("Channel ID missing, cannot update");
    return;
  }

  try {
    this.channel.updatedAt = new Date().toISOString();

    // ✅ call service method for update + avatar
    const updatedChannel = await this.channelApi.updateChannelWithAvatar(
      this.channel,
      this.selectedAvatarFile
    );

    console.log("✅ Channel updated successfully:", updatedChannel);
    this.dialogRef.close(updatedChannel);

  } catch (err) {
    console.error("Unexpected error updating channel:", err);
  }
}


  onCancel() {
    this.dialogRef.close(this.originalChannel); // ✅ return old/original
  }
}
