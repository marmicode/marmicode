import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-coming-soon',
  imports: [MatCardModule],
  template: `
    <mat-card role="article" class="card">
      <mat-card-content class="coming-soon-content">
        <h3>More Workshops Coming Soon!</h3>
        <ul>
          <li>AI-Assisted TDD</li>
          <li>Modern Angular</li>
          <li>Architecture</li>
          <li>Nx</li>
          <li>NestJS</li>
          <li>...</li>
        </ul>
        <div role="note" class="coming-soon-note">
          Stay tuned for updates and new workshop announcements!
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    .card {
      overflow: hidden;
      opacity: 0.85;
      border: 2px dashed #1976d2;
      background: #f5faff;

      h3 {
        font-weight: 700;
        font-size: 24px;
        color: #1976d2;
        margin-bottom: 1em;
        text-align: center;
      }

      ul {
        padding: 0;
        margin: 0 0 1em 0;
        text-align: left;
        color: #333;
        font-size: 1.1em;
      }
    }

    .coming-soon-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      min-height: 300px;
    }

    .coming-soon-note {
      color: #666;
      font-size: 1em;
      text-align: center;
    }
  `,
})
export class ComingSoon {}
