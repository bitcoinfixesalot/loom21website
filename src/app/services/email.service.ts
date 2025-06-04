import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'https://app.loom21.com/api/Users/ContactUs'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  sendEmail(email: string, subject: string, content: string): Observable<any> {
    const headers = new HttpHeaders().set('apiKey', 'YES_YOU_ARE_CONTACTING_THE_MAXIS'); // Set your API key here
    return this.http.post<any>(this.apiUrl, {email: email, subject: subject, body: content}, { headers });
  }
}
