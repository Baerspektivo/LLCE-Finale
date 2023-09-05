import { Component, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DataInput } from '../services/data-input';

@Component({
  selector: 'LL-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.css']
})
export class CookieBannerComponent {
  privacyPolice: any;
  currentLanguage: string = 'english';


  constructor(
    private cookieServ: CookieService,
  ){}

  giveConsent(){
    this.cookieServ.set('cookieConsent', 'true');
    this.setNecessaryCookies();
  }

  setNecessaryCookies(){
    this.cookieServ.set('exampleCookie', 'exampleValue');
    this.cookieServ.set('authCookie', 'authValue');
  }

  revokeConsent(){
    this.cookieServ.delete('cookieConsent');
    this.cookieServ.delete('exampleCookie');
    this.cookieServ.delete('authCookie');
  }

  hasConsent(): boolean{
    return this.cookieServ.get('cookieConsent') === 'true';
  }

  changeLanguage(language: string) {
    this.currentLanguage = language;
    this.cookieServ.set('selectedLanguage', language);
    // Füge hier den Code zum Laden der Datenschutzrichtlinieninhalte in der ausgewählten Sprache hinzu
  }

}
