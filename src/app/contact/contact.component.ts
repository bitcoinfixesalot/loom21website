import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  showSuccess: boolean = false;
  successMessage = "Thank You! Your message has been received. We'll get back to you soon." 
  form: UntypedFormGroup;
  constructor(private formBuilder: UntypedFormBuilder,
    private emailService: EmailService) { 
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      business: [''],
      message: ['', Validators.required]
    });
  }
  
  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get message() { return this.form.get('message'); }
  get business() { return this.form.get('business'); }
  
  
  ngOnInit(): void {
  }
  
  onSubmit(){
    if(this.form.invalid){
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

    this.emailService.sendEmail(this.email?.value, subject, content).subscribe({
      next: (response) => {        
        this.showSuccess = true;
        this.form.disable();
        console.log('Email sent', response);
      },
      error: (error) => console.error('There was an error!', error),
      complete: () => console.log('Email sending completed.')
    });
    // this.emailService.sendEmail(this.email, subject, content)
    //   .then(() => {
    //     this.showSuccess = true;
    //     console.log('Email sent successfully');
    //   })
    //   .catch((error) => {
    //     console.error('Error sending email:', error);
    //   });
  }
}
