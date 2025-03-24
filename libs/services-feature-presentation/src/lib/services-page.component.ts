import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { createBasicPageInfo, PageModule } from '@marmicode/shared-ui';
import { ActionButtonModule, ActionButtonComponent } from './action-button.component';
import { BannerModule, BannerComponent } from './banner.component';
import { CoachModule, CoachComponent } from './coach.component';
import { SectionModule, SectionComponent } from './section.component';
import { SlantModule, SlantComponent } from './slant.component';
import { WorkshopsButtonModule, WorkshopsButtonComponent } from './workshops-button.component';
import { PageComponent } from '@marmicode/shared-ui';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'mc-services-page',
    template: ` <mc-page [info]="pageInfo">
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
          <div class="workshops-button-container">
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
          <div class="actions-container">
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

      .actions-container,
      .workshops-button-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
    `,
    ],
    standalone: true,
    imports: [
        PageComponent,
        BannerComponent,
        SlantComponent,
        SectionComponent,
        WorkshopsButtonComponent,
        ActionButtonComponent,
        CoachComponent,
    ],
})
export class ServicesPageComponent {
  pageInfo = createBasicPageInfo({
    title: 'Services',
    description: 'We help you cook better apps.',
  });
}

@NgModule({
    exports: [ServicesPageComponent],
    imports: [
        CommonModule,
        BannerModule,
        SlantModule,
        SectionModule,
        WorkshopsButtonModule,
        MatButtonModule,
        ActionButtonModule,
        CoachModule,
        PageModule,
        ServicesPageComponent,
    ],
})
export class ServicesModule {}
