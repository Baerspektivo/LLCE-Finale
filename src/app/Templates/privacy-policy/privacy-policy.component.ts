import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DataInput } from 'src/app/services/data-input';



@Component({
  selector: 'LL-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit{
 privacyPolicy: any;
 currentLanguage = 'english';
  englishContent: any;

 constructor(
  private http: HttpClient,
  private cookieService: CookieService,
  private dataInput: DataInput,
  ){}

  ngOnInit(): void {
    this.loadPrivacyPolicy();

    // Wenn eine ausgewählte Sprache im Cookie gespeichert ist, verwende sie
    const selectedLanguage = this.cookieService.get('selectedLanguage');
    if (selectedLanguage === 'german' || selectedLanguage === 'english') {
      this.currentLanguage = selectedLanguage;
    }

    this.fetchPrivacyPolicy(this.currentLanguage);
  }

  fetchPrivacyPolicy(language: string): void {
    const url = `assets/PrivacyPolicy${language}.json`;
    this.http.get(url).subscribe((data) => {
      this.privacyPolicy = data;
    });
  }

  loadPrivacyPolicy() {
    // Lade die Datenschutzerklärung für die ausgewählte Sprache
    this.dataInput.getPrivacyPolicy(this.currentLanguage).subscribe((data) => {
      this.privacyPolicy = data;
    });
  }

  changeLanguage(language: string) {
    this.currentLanguage = language;
    this.cookieService.set('selectedLanguage', language);

    // Lade die Privacy Policy für die ausgewählte Sprache
    this.dataInput.getPrivacyPolicy(language).subscribe((data) => {
      this.privacyPolicy = data;
    });
  }
}
