import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MarkdownTokens } from '@marmicode/block-core';
import { NgIf } from '@angular/common';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'mc-markdown-media',
    template: `<img
      *ngIf="!isVideo"
      [alt]="token.text"
      [src]="token.href"
      class="image"
    />
    <video
      *ngIf="isVideo"
      [src]="token.href"
      [title]="token.text"
      class="video"
      controls
    ></video> `,
    styles: [
        `
      :host {
        display: block;
        text-align: center;
      }

      .image,
      .video {
        max-width: 100%;
      }

      .video {
        outline: none;
      }
    `,
    ],
    standalone: true,
    imports: [NgIf],
})
export class MarkdownMediaComponent implements OnChanges {
  @Input() token: MarkdownTokens.Media;
  isVideo: boolean;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.token) {
      this.isVideo = this.token.href?.endsWith('.mp4');
    }
  }
}
