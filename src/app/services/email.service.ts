import { Injectable } from '@angular/core';
import sgMail from '@sendgrid/mail';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() {
    sgMail.setApiKey("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");

   }

  sendEmail(to: string, subject: string, content: string): Promise<any> {
    const msg = {
      to,
      from: 'info@loom21.com',
      subject,
      html: content
    };
    
    return sgMail.send(msg);
  }
}
