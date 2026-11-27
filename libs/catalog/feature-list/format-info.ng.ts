import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedPosition,
} from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TrainingFormat, TrainingLanguage } from '@marmicode/training/core';
import {
  TRAINING_FORMAT_EMOJIS,
  TRAINING_FORMAT_LABELS,
} from '@marmicode/training/ui';

/**
 * An info button that opens a bubble explaining each training format.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-format-info',
  imports: [
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <button
      #origin="cdkOverlayOrigin"
      cdkOverlayOrigin
      class="info-button"
      matIconButton
      type="button"
      [attr.aria-label]="labels().buttonLabel"
      aria-controls="format-info-bubble"
      [attr.aria-expanded]="isOpen()"
      (click)="isOpen.set(!isOpen())"
    >
      <mat-icon>info_outline</mat-icon>
    </button>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayPush]="true"
      [cdkConnectedOverlayViewportMargin]="16"
      (overlayOutsideClick)="close($event)"
      (overlayKeydown)="$event.key === 'Escape' && isOpen.set(false)"
      (detach)="isOpen.set(false)"
    >
      <div
        id="format-info-bubble"
        class="bubble"
        role="dialog"
        aria-labelledby="format-info-title"
      >
        <h4 id="format-info-title" class="title">{{ labels().title }}</h4>
        <dl>
          @for (format of formats(); track format.value) {
            <div class="format">
              <dt>
                <span aria-hidden="true">{{ format.emoji }}</span>
                {{ format.label }}
              </dt>
              <dd>{{ format.description }}</dd>
            </div>
          }
        </dl>
      </div>
    </ng-template>
  `,
  styles: `
    .info-button {
      /* Discreet: it sits right next to the format filter. */
      --mat-icon-button-state-layer-size: 32px;
      --mat-icon-button-icon-color: #777;
      padding: 4px;
    }

    .bubble {
      width: min(360px, calc(100vw - 48px));
      box-sizing: border-box;
      padding: 1rem 1.25rem;
      background: white;
      border-radius: 12px;
      box-shadow: var(--mat-sys-level3, 0 4px 16px rgba(0, 0, 0, 0.18));
      color: #333;
    }

    .title {
      margin: 0 0 0.75rem;
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--marmicode-primary-color);
    }

    dl {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin: 0;
    }

    dt {
      font-weight: 700;
      color: var(--marmicode-primary-color);
    }

    dd {
      margin: 0.15rem 0 0;
      line-height: 1.4;
    }
  `,
})
export class FormatInfo {
  isOpen = signal(false);

  language = input<TrainingLanguage>('en');

  protected labels = computed(() => FORMAT_INFO_LABELS[this.language()]);
  protected formats = computed(() => {
    const language = this.language();
    return FORMATS.map((format) => ({
      value: format,
      emoji: TRAINING_FORMAT_EMOJIS[format],
      label: TRAINING_FORMAT_LABELS[language][format],
      description: this.labels().descriptions[format],
    }));
  });

  positions: ConnectedPosition[] = [
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      offsetY: 4,
    },
    {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom',
      offsetY: -4,
    },
  ];

  /**
   * Clicking the info button toggles the bubble on its own,
   * so it must not count as an outside click that closes it first.
   */
  close(event: MouseEvent) {
    const button = (event.target as Element | null)?.closest(
      'mc-format-info button',
    );
    if (button == null) {
      this.isOpen.set(false);
    }
  }
}

const FORMATS: TrainingFormat[] = ['video-course', 'cohort', 'workshop'];

const FORMAT_INFO_LABELS_EN = {
  buttonLabel: 'What do the formats mean?',
  title: 'Which format fits you?',
  descriptions: {
    'video-course':
      'Self-paced: watch the lessons and do the exercises whenever you want.',
    cohort:
      'A multi-week program with a group: a live session every week, a video course with assignments, and a private community.',
    workshop:
      'Live and hands-on, over one to three days. Public sessions, or in-house for your team.',
  } satisfies Record<TrainingFormat, string>,
};

const FORMAT_INFO_LABELS_FR: typeof FORMAT_INFO_LABELS_EN = {
  buttonLabel: 'Que signifient les formats ?',
  title: 'Quel format vous convient ?',
  descriptions: {
    'video-course':
      'À votre rythme : regardez les leçons et faites les exercices quand vous le souhaitez.',
    cohort:
      'Un programme de plusieurs semaines en groupe : une session live chaque semaine, un cours vidéo avec des exercices, et une communauté privée.',
    workshop:
      'En direct et pratique, sur un à trois jours. Sessions publiques, ou en intra pour votre équipe.',
  },
};

const FORMAT_INFO_LABELS: Record<
  TrainingLanguage,
  typeof FORMAT_INFO_LABELS_EN
> = {
  en: FORMAT_INFO_LABELS_EN,
  fr: FORMAT_INFO_LABELS_FR,
};
