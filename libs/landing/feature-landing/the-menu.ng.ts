import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Card, LinkComponent, PageSection } from '@marmicode/shared/ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-the-menu',
  imports: [PageSection, MatButtonModule, MatIconModule, LinkComponent, Card],
  template: `
    <mc-page-section pageTitle="🍜 The Menu" color="plain">
      <div class="container">
        <mc-card icon="menu_book">
          <ng-container slot="title"> Courses & Cookbooks </ng-container>
          <ng-container slot="content">
            <p>Self-paced learning, no fluff, just the sauce.</p>
            <div class="menu-list">
              <div class="menu-item">
                <mat-icon>school</mat-icon>
                Pragmatic Angular Testing
                <span class="menu-price">80 €</span>
              </div>
              <div class="menu-item">
                <mat-icon>book</mat-icon>
                Free Cookbook
              </div>
            </div>
            <mc-link href="https://courses.marmicode.io/">
              <button mat-button color="primary">
                View Course
                <mat-icon>arrow_forward</mat-icon>
              </button>
            </mc-link>
          </ng-container>
        </mc-card>

        <mc-card icon="school">
          <ng-container slot="title"> Workshops </ng-container>
          <ng-container slot="content">
            <p>Hands on sessions for devs who want level up fast.</p>
            <div class="menu-list">
              <div class="menu-item">
                <mat-icon>school</mat-icon>
                Angular Testing — Tapas Edition
              </div>
              <div class="menu-item">
                <mat-icon>architecture</mat-icon>
                Architecture, Typescript, Node.js…
              </div>
              <div class="menu-item">
                <mat-icon>groups</mat-icon>
                Public & in-house, OPCO-financed
              </div>
            </div>
            <mc-link href="https://marmicode.eventbrite.com">
              <button mat-button color="primary">
                See All Workshops
                <mat-icon>arrow_forward</mat-icon>
              </button>
            </mc-link>
          </ng-container>
        </mc-card>

        <mc-card icon="support_agent">
          <ng-container slot="title"> Coaching & Reviews </ng-container>
          <ng-container slot="content">
            <p>Get tailored help via code reviews or 1.1 sessions.</p>
            <div class="menu-list">
              <div class="menu-item">
                <mat-icon>autorenew</mat-icon>
                Monthly Code Reviews
                <span class="menu-price">From 150 €/month</span>
              </div>
              <div class="menu-item">
                <mat-icon>person</mat-icon>
                1.1 Coaching
                <span class="menu-price">From 800 €/month</span>
              </div>
            </div>
            <mc-link href="mailto:kitchen@marmicode.io">
              <button mat-button color="primary">
                Find Your Flavor
                <mat-icon>arrow_forward</mat-icon>
              </button>
            </mc-link>
          </ng-container>
        </mc-card>
      </div>
    </mc-page-section>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 2.5rem;
      }

      .menu-columns {
        display: flex;
        flex-direction: row;
        gap: 2.5rem;
        justify-content: center;
        max-width: 1100px;
        margin: 0 auto;
      }

      .menu-col {
        flex: 1 1 0;
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        padding: 2rem 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        min-width: 260px;
        max-width: 340px;
      }

      .menu-icon {
        font-size: 2.2rem;
        color: #561f4b;
        margin-bottom: 0.7rem;
      }

      .menu-col h3 {
        font-size: 1.2rem;
        font-weight: 700;
        margin-bottom: 0.7rem;
        color: #561f4b;
      }

      .menu-col p {
        font-size: 1rem;
        margin-bottom: 1.2rem;
        color: #2d1a13;
      }

      .menu-list {
        margin-bottom: 1.2rem;
        width: 100%;
      }

      .menu-item {
        display: flex;
        align-items: center;
        font-size: 1rem;
        margin-bottom: 0.5rem;
        color: #561f4b;
      }

      .menu-item mat-icon {
        font-size: 1.1rem;
        margin-right: 0.5rem;
        color: #5db3ad;
      }

      .menu-price {
        margin-left: 0.5rem;
        color: #5db3ad;
        font-weight: 600;
        font-size: 0.95em;
      }

      @media (max-width: 1100px) {
        .menu-columns {
          flex-direction: column;
          gap: 1.5rem;
          align-items: center;
        }
      }
    `,
  ],
})
export class TheMenu {}
