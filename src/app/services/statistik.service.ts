import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root',
})
export class StatistikService {
  private correct: number = 0;
  private incorrect: number = 0;
  private skip: number = 0;

  incrementCounterOfCorrect(): void {
    this.correct++;
  }
  incrementCounterOfIncorrect(): void {
    this.incorrect++;
  }
  incrementCounterOfSkip(): void {
    this.skip++;
  }
  getCounterOfCorrect(): number {
    return this.correct;
  }
  getCounterOfIncorrect(): number {
    return this.incorrect;
  }
  getCounterOfSkip(): number {
    return this.skip;
  }
  resetStatistics(): void{
    this.correct = 0;
    this.incorrect = 0;
    this.skip = 0;
  }
}
