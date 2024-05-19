import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  form: UntypedFormGroup;
  constructor(private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,) { 
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
  
  
  ngOnInit(): void {
  }
  
  onSubmit(){
    if(this.form.invalid){
      console.log("form invalid");
      return;
    }
    console.log("submit")
  }
}
