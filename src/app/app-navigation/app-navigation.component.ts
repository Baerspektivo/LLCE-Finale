import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'LL-app-navigation',
  templateUrl: './app-navigation.component.html',
  styleUrls: ['./app-navigation.component.css']
})
export class AppNavigationComponent {

  constructor(
    private router: Router,
  ) {}

  subMenus: { [menuName: string]: boolean} = {
    'learningMode': false,
    'checkMode': false,
    'examMode': false,
    'fragenliste': false,
    'einzelfragen': false,
  };

  toggleSubMenu(menuName: string): void {
    if (this.subMenus[menuName]) {
      this.router.navigateByUrl('/home'); // Hier wird zur "Home"-Seite navigiert
      for (const key in this.subMenus) {
          this.subMenus[key] = false; // Zurücksetzen aller anderen Untermenüs
      }
    } else {
      this.subMenus[menuName] = !this.subMenus[menuName];
    }
  }

  isSubMenuOpen(menuName: string): boolean {
    return this.subMenus[menuName];
  }
}


