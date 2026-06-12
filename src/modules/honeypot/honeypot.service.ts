import { Injectable, Logger } from '@nestjs/common';
import { sendEmail } from './ses.config';

@Injectable()
export class HoneypotService {
  private readonly logger = new Logger(HoneypotService.name);

  async triggerHoneypot(payload: any): Promise<void> {
    this.logger.log(
      `triggerHoneypot called with payload: ${JSON.stringify(payload)}`,
    );
    const recipientEmail = 'osamanimer6@gmail.com';
    const subject = 'Honeypot Triggered';
    const bodyHtml = `<p>Honeypot triggered with payload:</p><pre>${JSON.stringify(
      payload,
      null,
      2,
    )}</pre>`;

    await sendEmail(recipientEmail, subject, bodyHtml);
  }
}
