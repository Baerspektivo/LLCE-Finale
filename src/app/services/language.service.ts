import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject = new Subject<string>();

  language$ = this.languageSubject.asObservable

  getlanguage$(): Observable<string> {
    return this.languageSubject.asObservable();
  }

  setLanguage(language: string){
    this.languageSubject.next(language);
  }
  constructor() { }
}
