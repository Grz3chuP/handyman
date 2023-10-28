import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {



email: string = '';
message: string = '';

isValid() {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(this.email);
}

  sendEmail(e: Event) {
    if (this.email == '' || this.message == '') {
      alert('Please fill in all fields');
      return;
    } else if (!this.isValid()) {
      alert('Please enter a valid email address');
      return;
    } else if (this.isValid()) {
      e.preventDefault();
      emailjs.sendForm('service_gbtw6gn', 'template_qspkxvo', e.target as HTMLFormElement, '8PQvjepagDVzW_K45')
        .then((result: EmailJSResponseStatus) => {
          console.log(result.text);
          alert('Message sent!');
        }, (error) => {
          console.log(error.text);
          alert('An error occurred' + error.text + ', Please try again');
        });
    }
  }




}
