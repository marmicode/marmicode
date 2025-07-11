import { ChangeDetectionStrategy, Component } from '@angular/core';
import { createBasicPageInfo, Hero, PageComponent } from '@marmicode/shared/ui';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-landing-page',
  imports: [PageComponent, MatButtonModule, MatCardModule, MatIconModule, Hero],
  template: `
    <mc-page [info]="pageInfo">
      <mc-hero
        [pictureUri]="
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80'
        "
        contentPosition="middle"
        size="half-height"
        title="Turn Code Into Cuisine"
      >
        <ng-content slot="content">
          <h2>
            Workshops, coaching, and recipes for devs who want to ship with
            confidence — and taste.
          </h2>
        </ng-content>
      </mc-hero>

      <!-- About the Cook Section -->
      <section class="about">
        <h2 class="section-title">About the Cook</h2>
        <div class="about-content">
          <img
            class="about-img"
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Younes, the Software Cook"
          />
          <div class="about-text">
            <h3>I’m Younes, aka the Software Cook.</h3>
            <p>
              I help devteams build robust, testable apps through code reviews,
              live workshops, and structured coaching — no spaghetti code, just
              clean flavors and sharp techniques.
            </p>
            <button
              mat-button
              color="primary"
              class="about-cta"
              (click)="openWhatsCooking()"
            >
              What’s Cooking? <mat-icon>arrow_forward</mat-icon>
            </button>
          </div>
        </div>
      </section>

      <!-- The Menu Section -->
      <section class="menu">
        <h2 class="section-title">The Menu</h2>
        <div class="menu-columns">
          <div class="menu-col">
            <mat-icon class="menu-icon">menu_book</mat-icon>
            <h3>Courses & Cookbooks</h3>
            <p>Self-paced learning, no fluff, just the sauce.</p>
            <div class="menu-list">
              <div class="menu-item">
                <mat-icon>school</mat-icon> Pragmatic Angular Testing
                <span class="menu-price">80 €</span>
              </div>
              <div class="menu-item">
                <mat-icon>book</mat-icon> Free Cookbook
              </div>
            </div>
            <button
              mat-button
              color="primary"
              class="menu-link"
              (click)="openCourses()"
            >
              View All Courses <mat-icon>arrow_forward</mat-icon>
            </button>
          </div>
          <div class="menu-col">
            <mat-icon class="menu-icon">event</mat-icon>
            <h3>Workshops</h3>
            <p>Hands on sessions for devs who want level up fast.</p>
            <div class="menu-list">
              <div class="menu-item">
                <mat-icon>school</mat-icon> Angular Testing — Tapas Edition
              </div>
              <div class="menu-item">
                <mat-icon>architecture</mat-icon> Architecture, Typescript,
                Node.js…
              </div>
              <div class="menu-item">
                <mat-icon>groups</mat-icon> Public & in-house, OPCO-financed
              </div>
            </div>
            <button
              mat-button
              color="primary"
              class="menu-link"
              (click)="openWorkshops()"
            >
              See All Workshops <mat-icon>arrow_forward</mat-icon>
            </button>
          </div>
          <div class="menu-col">
            <mat-icon class="menu-icon">support_agent</mat-icon>
            <h3>Coaching & Reviews</h3>
            <p>Get tailored help via code reviews or 1.1 sessions.</p>
            <div class="menu-list">
              <div class="menu-item">
                <mat-icon>autorenew</mat-icon> Monthly Code Reviews
                <span class="menu-price">From 150 €/month</span>
              </div>
              <div class="menu-item">
                <mat-icon>person</mat-icon> 1.1 Coaching
                <span class="menu-price">From 800 €/month</span>
              </div>
            </div>
            <button
              mat-button
              color="primary"
              class="menu-link"
              (click)="openContact()"
            >
              Find Your Flavor <mat-icon>arrow_forward</mat-icon>
            </button>
          </div>
        </div>
      </section>

      <!-- Upcoming Events Section -->
      <section class="events">
        <h2 class="section-title">Upcoming Events</h2>
        <div class="events-cards">
          <mat-card class="event-card">
            <div class="event-header">
              <mat-icon class="event-icon" color="primary">event</mat-icon>
              <div>
                <h3>Angular Testing — Tapas Edition</h3>
                <div class="event-date">July 15, 2024</div>
              </div>
            </div>
            <p>
              Hands-on workshop to master Angular testing, with live coding and
              Q&A. Limited seats!
            </p>
            <button
              mat-stroked-button
              color="primary"
              (click)="openWorkshops()"
            >
              View Details
            </button>
          </mat-card>
          <mat-card class="event-card">
            <div class="event-header">
              <mat-icon class="event-icon" color="primary">event</mat-icon>
              <div>
                <h3>Monthly Code Review</h3>
                <div class="event-date">August 1, 2024</div>
              </div>
            </div>
            <p>
              Get your code reviewed by an expert. Async, actionable feedback
              for your team or project.
            </p>
            <button mat-stroked-button color="primary" (click)="openContact()">
              Book Now
            </button>
          </mat-card>
          <mat-card class="event-card">
            <div class="event-header">
              <mat-icon class="event-icon" color="primary">event</mat-icon>
              <div>
                <h3>Architecture Deep Dive</h3>
                <div class="event-date">September 10, 2024</div>
              </div>
            </div>
            <p>
              Advanced session on scalable frontend and backend architecture.
              For teams and individuals.
            </p>
            <button mat-stroked-button color="primary" (click)="openContact()">
              Join Waitlist
            </button>
          </mat-card>
        </div>
      </section>
    </mc-page>
  `,
  styles: [
    `
      .hero {
        position: relative;
        background: linear-gradient(90deg, #561f4b 0%, #5db3ad 100%);
        color: white;
        text-align: center;
        min-height: 380px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
      }
      .hero-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80')
          center/cover no-repeat;
        opacity: 0.18;
        z-index: 1;
      }
      .hero-content {
        position: relative;
        z-index: 2;
        width: 100%;
        padding: 4rem 1rem 3rem 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .hero-title {
        font-size: 3rem;
        font-family: serif;
        font-weight: 700;
        margin-bottom: 1rem;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }
      .hero-subtitle {
        font-size: 1.3rem;
        margin-bottom: 2rem;
        font-weight: 400;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      .hero-cta {
        font-size: 1.1rem;
        padding: 0.8rem 2.5rem;
        background: #561f4b;
        color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(86, 31, 75, 0.1);
      }
      .hero-cta mat-icon {
        margin-right: 0.5rem;
      }
      .about {
        background: #f5f5fa;
        padding: 3rem 1rem;
      }
      .section-title {
        font-size: 2.2rem;
        font-family: serif;
        font-weight: 700;
        text-align: center;
        margin-bottom: 2rem;
        color: #561f4b;
      }
      .about-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 2.5rem;
        max-width: 900px;
        margin: 0 auto;
      }
      .about-img {
        width: 240px;
        height: 240px;
        object-fit: cover;
        border-radius: 16px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      }
      .about-text {
        flex: 1;
        text-align: left;
      }
      .about-text h3 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: #561f4b;
      }
      .about-text p {
        font-size: 1.1rem;
        margin-bottom: 1.2rem;
        color: #2d1a13;
      }
      .about-cta {
        font-size: 1rem;
        color: #5db3ad;
        font-weight: 600;
      }
      .about-cta mat-icon {
        vertical-align: middle;
        margin-left: 0.2rem;
      }
      .menu {
        background: #f5f5fa;
        padding: 3rem 1rem;
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
      .menu-link {
        color: #5db3ad;
        font-weight: 600;
        font-size: 1rem;
        margin-top: 0.5rem;
      }
      .menu-link mat-icon {
        vertical-align: middle;
        margin-left: 0.2rem;
      }
      .pricing {
        background: #fff;
        padding: 3rem 1rem 4rem 1rem;
      }
      .pricing-columns {
        display: flex;
        flex-direction: row;
        gap: 2.5rem;
        justify-content: center;
        max-width: 1100px;
        margin: 0 auto;
      }
      .pricing-col {
        flex: 1 1 0;
        background: #f5f0e6;
        border-radius: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        padding: 2rem 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 220px;
        max-width: 340px;
      }
      .pricing-icon {
        font-size: 2.2rem;
        margin-bottom: 0.7rem;
      }
      .pricing-col h3 {
        font-size: 1.1rem;
        font-weight: 700;
        margin-bottom: 0.7rem;
        color: #2d1a13;
      }
      .pricing-col p {
        font-size: 1rem;
        color: #2d1a13;
      }
      .events {
        background: #f5f5fa;
        padding: 3rem 1rem;
      }
      .events-cards {
        display: flex;
        flex-direction: row;
        gap: 2.5rem;
        justify-content: center;
        max-width: 1100px;
        margin: 0 auto;
      }
      .event-card {
        flex: 1 1 0;
        min-width: 260px;
        max-width: 340px;
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        padding: 2rem 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        color: #561f4b;
      }
      .event-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
      }
      .event-icon {
        font-size: 2.2rem;
        color: #561f4b;
      }
      .event-date {
        font-size: 1rem;
        color: #5db3ad;
        font-weight: 600;
        margin-top: 0.2rem;
      }
      .event-card h3 {
        color: #561f4b;
        font-size: 1.1rem;
        font-weight: 700;
        margin-bottom: 0.2rem;
      }
      .event-card p {
        color: #561f4b;
        font-size: 1rem;
        margin-bottom: 1.2rem;
      }
      @media (max-width: 1100px) {
        .menu-columns,
        .pricing-columns {
          flex-direction: column;
          gap: 1.5rem;
          align-items: center;
        }
        .about-content {
          flex-direction: column;
          gap: 1.5rem;
        }
        .events-cards {
          flex-direction: column;
          gap: 1.5rem;
          align-items: center;
        }
      }
    `,
  ],
})
export class LandingPage {
  pageInfo = createBasicPageInfo({
    title: 'Cook better apps with Marmicode',
    description:
      'Workshops, courses, and coaching to help you build better Angular apps. Learn from a Google Developer Expert and eXtreme Programming coach.',
  });

  openMenu() {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }
  openWhatsCooking() {
    window.open('https://marmicode.io/blog', '_blank');
  }
  openCourses() {
    window.open('https://courses.marmicode.io/', '_blank');
  }
  openWorkshops() {
    window.open('https://marmicode.eventbrite.com', '_blank');
  }
  openContact() {
    window.open('mailto:kitchen@marmicode.io', '_blank');
  }
}
