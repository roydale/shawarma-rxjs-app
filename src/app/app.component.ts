import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, Subject, map, tap, zip } from 'rxjs';

type Shawarma = [
  'Flat Bread',
  'Meat',
  'Yogurt Sauce',
  'Spices',
  'Tomato',
  'Lemon Juice',
  boolean?,
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: 'alt-app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Shawarma Maker 3000';
  chance = 5;
  shawarma$!: Observable<Shawarma>;

  _flatBread = new Subject<'Flat Bread'>();
  _meat = new Subject<'Meat'>();
  _yogurtSauce = new Subject<'Yogurt Sauce'>();
  _spices = new Subject<'Spices'>();
  _tomato = new Subject<'Tomato'>();
  _lemonJuice = new Subject<'Lemon Juice'>();
  _isHappySharwarma = new Subject<boolean>();

  shawarmas: Array<Shawarma> = [];

  flatBreadCount = 0;
  meatCount = 0;
  yogurtSauceCount = 0;
  spicesCount = 0;
  tomatoCount = 0;
  lemonJuiceCount = 0;
  regularShawarmaCount = 0;
  happyShawarmaCount = 0;

  ngOnInit(): void {
    this.shawarma$ = zip(
      this._flatBread.pipe(
        map((data) => `${++this.flatBreadCount} ${data}`),
        tap(console.log),
      ),
      this._meat.pipe(
        map((data) => `${++this.meatCount} ${data}`),
        tap(console.log),
      ),
      this._yogurtSauce.pipe(
        map((data) => `${++this.yogurtSauceCount} ${data}`),
        tap(console.log),
      ),
      this._spices.pipe(
        map((data) => `${++this.spicesCount} ${data}`),
        tap(console.log),
      ),
      this._tomato.pipe(
        map((data) => `${++this.tomatoCount} ${data}`),
        tap(console.log),
      ),
      this._lemonJuice.pipe(
        map((data) => `${++this.lemonJuiceCount} ${data}`),
        tap(console.log),
      ),
    ).pipe(
      tap((shawarma: Shawarma) => {
        console.log('Shawarma is done!:', shawarma);
        this.collectShawarma(shawarma);
      }),
    );
  }

  isShowHappyShawarma(): boolean {
    const randomNumber = Math.floor(Math.random() * this.chance) + 1;
    return randomNumber === 1;
  }

  collectShawarma(shawarma: Shawarma) {
    const isHappy = this.isShowHappyShawarma();
    if (isHappy) {
      ++this.happyShawarmaCount;
    } else {
      ++this.regularShawarmaCount;
    }
    shawarma[6] = isHappy;
    this.shawarmas.push(shawarma);
  }
}
