import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media-search-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media-search-result.component.html',
  styleUrl: './media-search-result.component.css'
})
export class MediaSearchResultComponent {
  @Input() title!: string;
  @Input() imageUrl!: string;
}
