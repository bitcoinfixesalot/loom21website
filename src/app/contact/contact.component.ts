
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../services/email.service';
import { DESCRIPTIONS, LD_JSON, SUCCESS_MESSAGE, TITLES } from '../constants/localized-const';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-contact',
    imports: [ReactiveFormsModule, FormsModule],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {

  showSuccess: boolean = false;
  isSubmitting: boolean = false;
  successMessage = SUCCESS_MESSAGE;//"Thank You! Your message has been received. We'll get back to you soon." 
  form: UntypedFormGroup;
  private formStart = Date.now();
  private minSubmitDelayMs = 3000; // require at least N ms before accepting submission

  constructor(private formBuilder: UntypedFormBuilder, private titleService: Title, private metaService: Meta,
    private emailService: EmailService) {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      business: [''],
      message: ['', Validators.required],
      hp: [''] // honeypot field (hidden in template)
    });

    this.formStart = Date.now();
  }

  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get message() { return this.form.get('message'); }
  get business() { return this.form.get('business'); }
  get hp() { return this.form.get('hp'); }
  

  ngOnInit(): void {

    this.titleService.setTitle(TITLES.contact);
    this.metaService.updateTag({
      name: 'description',
      content: DESCRIPTIONS.contact_description//'Reset your password to manage inventory, payments, and Bitcoin conversions.'
    });
    this.metaService.addTag({
      name: 'application/ld+json',
      content: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        'name': 'Contact - Loom 21',
        'description': LD_JSON.contact_description,
        'isPartOf': {
          '@type': 'WebSite',
          'name': 'Loom 21'
        }
      })
    });
  }

  onSubmit() {
    // Basic bot checks: honeypot or too-fast submit
    if (this.hp?.value && this.hp.value.trim() !== '') {
      console.warn('Honeypot triggered — likely bot.');
      return;
    }
    if (Date.now() - this.formStart < this.minSubmitDelayMs) {
      console.warn('Form submitted too quickly — likely bot.');
      return;
    }

    if (this.form.invalid) {
      console.log("form invalid");
      return;
    }

    const subject = 'loom21 contacted';
    const content = `
      <html>
      <body>
        <h1>From ${this.business?.value} - ${this.name?.value} - ${this.email?.value}</h1>
        <p>${this.message?.value}</p>
      </body>
      </html>
    `

    this.isSubmitting = true;
    this.emailService.sendEmail(this.email?.value, subject, content).subscribe({
      next: (response) => {
        this.showSuccess = true;
        this.isSubmitting = false;
        this.form.disable();
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.isSubmitting = false;
      },
      complete: () => console.log('Email sending completed.')
    });

  }
}
