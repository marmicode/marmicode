import { Injectable } from '@angular/core';
import { Session, Workshop } from '../core/workshop';

@Injectable({ providedIn: 'root' })
export class WaitlistUrlBuilder {
  generateWaitlistUrl(workshop: Workshop, session?: Session): string {
    const dateStr = session ? ` on ${session.date.toDateString()}` : '';
    const url = new URL('mailto:kitchen@marmicode.io');
    url.searchParams.set('subject', `Registration for ${workshop.title}`);
    url.searchParams.set(
      'body',
      `Hi! I'd like to be added to the waitlist for ${workshop.title} (${workshop.type} Session)${dateStr}.`,
    );
    return url.toString();
  }
}
