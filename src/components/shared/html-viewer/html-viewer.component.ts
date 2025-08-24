import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-html-viewer',
  imports: [CommonModule],
  templateUrl: './html-viewer.component.html',
  styleUrls: ['./html-viewer.component.css'],
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated
})
export class HtmlViewerComponent {
  private _htmlContent: string | null = null;
  safeHtmlContent: SafeHtml | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  @Input()
  set htmlContent(value: string | null | undefined) {
    this._htmlContent = value ?? null;

    this.safeHtmlContent = (this._htmlContent && this._htmlContent.trim() !== '')
      ? this.sanitizer.bypassSecurityTrustHtml(this._htmlContent)
      : null;
  }

  get htmlContent(): string | null {
    return this._htmlContent;
  }
}
