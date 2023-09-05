import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'LL-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private cookieServ: CookieService,
  ) {
    this.cookieServ.set('cookieName', 'cookieValue')
    const cookieValue = this.cookieServ.get('cookieName');
    console.log('Cookie value', cookieValue);
  }
  //title = 'LLCE';
}
