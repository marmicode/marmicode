import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { BannerModule } from './banner.component';
import { SectionModule } from './section.component';
import { SlantModule } from './slant.component';
import { WorkshopsButtonModule } from './workshops-button.component';

declare var require;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-services',
  template: `<div class="content" [style.backgroundImage]="backgroundImageUrl">
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
          <mc-workshops-button></mc-workshops-button>
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
        </ng-container>
      </mc-section>
    </div>
  </div>`,
  styles: [
    `
      .content {
        background-color: #561f4b;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        height: calc(100vh - 64px);
        overflow-y: auto;
      }

      .services-presentation {
        background-color: white;
      }
    `,
  ],
})
export class ServicesComponent {
  backgroundImageUrl = `url(${
    require('!!file-loader!./banner-wide.jpg').default
  })`;
}

@NgModule({
  declarations: [ServicesComponent],
  exports: [ServicesComponent],
  imports: [
    CommonModule,
    BannerModule,
    SlantModule,
    SectionModule,
    WorkshopsButtonModule,
  ],
})
export class ServicesModule {}
