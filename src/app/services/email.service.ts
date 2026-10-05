import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'https://app.loom21.com/api/Users/ContactUs'; // Replace with your actual API URL

  constructor(private http: HttpClient) {
    if (isDevMode()) {
          this.apiUrl =  'https://localhost:7284/api/Users/ContactUs';
    
        }
        else {
          this.apiUrl =  'https://app.loom21.com/api/Users/ContactUs'; 
        }
   }

  sendEmail(email: string, subject: string, content: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, {email: email, subject: subject, body: content});
  }
}