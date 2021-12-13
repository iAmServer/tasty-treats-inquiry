import { environment } from 'src/environments/environment';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  inquiry: any = {};
  isSubmitted: boolean = false;
  siteKey = environment.reCaptchaKey;
  captcha: any = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.inquiry.name || !this.inquiry.email || !this.inquiry.message) {
      window.alert('Fill all required field');
      return;
    }

    if (!this.captcha) {
      window.alert('Please complete the reCapthca');
      return;
    }

    this.isSubmitted = true;

    this.apiService.submitInquiry(this.inquiry).subscribe(
      (res) => {
        window.alert(res.message);
        this.inquiry = {};
        this.isSubmitted = false;
      },
      (err) => {
        this.isSubmitted = false;
        window.alert(err.error.message);
      }
    );
  }

  resolved(captchaResponse: string): void {
    this.captcha = captchaResponse;
  }
}
