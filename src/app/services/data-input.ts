import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, map } from 'rxjs';
import { Question } from '../Model/question';


@Injectable({
  providedIn: 'root',
})
export class DataInput {
  constructor(private http: HttpClient) {}

  private katalog1Url = 'assets/LPI-2019-1-101d-QA.json';
  private katalog2Url = 'assets/LPI-2019-1-102d-QA.json';

  getQuestion1(): Observable<Question[]> {
    return this.http.get<Question[]>(this.katalog1Url);
  }

  getQuestion2(): Observable<Question[]> {
    return this.http.get<Question[]>(this.katalog2Url);
  }

  getKatalog1Url(): string {
    return this.katalog1Url;
  }

  getKaltalog2Url(): string {
    return this.katalog2Url;
  }

  getAllQuestions(): Observable<Question[]>{
    const question1 = this.getQuestion1();
    const question2 = this.getQuestion2();

    return combineLatest([question1, question2]).pipe(
      map(([question1,question2]) => [...question1, ...question2])
    );
  }
}
