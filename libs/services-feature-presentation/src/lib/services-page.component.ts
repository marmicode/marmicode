import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { PageModule } from '@marmicode/shared-ui';
import { ActionButtonModule } from './action-button.component';
import { BannerModule } from './banner.component';
import { CoachModule } from './coach.component';
import { SectionModule } from './section.component';
import { SlantModule } from './slant.component';
import { WorkshopsButtonModule } from './workshops-button.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-services-page',
  template: ` <mc-page title="Services">
    <mc-banner></mc-banner>
    <mc-slant></mc-slant>
    <div class="services-presentation">
      <!-- Workshops. -->
      <mc-section>
        <span slot="title">Workshops</span>
        <ng-container slot="content">
          <p>
            Our workshops focus on <strong>best practices</strong> and
            <strong>progressive architectures</strong>.
          </p>
          <p>
            They offer you the opportunity to
            <strong>deep dive</strong> in some advanced topics that will help
            you better understand how things work and choose the
            <strong>best ingredients</strong> for your apps.
          </p>
          <div fxLayout="row" fxLayoutAlign="center">
            <mc-workshops-button></mc-workshops-button>
          </div>
        </ng-container>
      </mc-section>

      <!-- Remote Consultations. -->
      <mc-section>
        <span slot="title">Coaching</span>
        <ng-container slot="content">
          <p>
            Every team is different. At Marmicode we adapt to your needs and
            help you build better apps with our technical and organizational
            skills.
          </p>
          <p>
            Our coaching services will help you find the right balance of spices
            and the most <strong>pragmatic approach</strong> to produce
            <strong>high quality apps without compromising velocity</strong>.
          </p>
          <div fxLayout="row" fxLayoutAlign="center">
            <mc-action-button
              icon="mail"
              label="GET IN TOUCH"
              uri="mailto:kitchen@marmicode.io"
            ></mc-action-button>
          </div>
        </ng-container>
      </mc-section>

      <!-- Your Coach. -->
      <mc-section>
        <span slot="title">Your Coach</span>
        <ng-container slot="content">
          <mc-coach></mc-coach>
        </ng-container>
      </mc-section>
    </div>
  </mc-page>`,
  styles: [
    `
      .services-presentation {
        background-color: white;
      }
    `,
  ],
})
export class ServicesPageComponent {}

@NgModule({
  declarations: [ServicesPageComponent],
  exports: [ServicesPageComponent],
  imports: [
    CommonModule,
    BannerModule,
    SlantModule,
    SectionModule,
    WorkshopsButtonModule,
    FlexLayoutModule,
    MatButtonModule,
    ActionButtonModule,
    CoachModule,
    PageModule,
  ],
})
export class ServicesModule {}
