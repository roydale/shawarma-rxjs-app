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
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div class="shawarma-maker">
      <div>
        <h3>Shawarma Maker 3000</h3>
        <img src="assets/shawarma.png" alt="shawarma" width="25" />
      </div>
      <hr />

      <div>
        <div class="ingredient">
          <span>Remaining: {{ flatBreadCount - shawarmas.length }}</span>
          <button (click)="_flatBread.next('Flat Bread')">Flat Bread</button>
        </div>

        <div class="ingredient">
          <span>Remaining: {{ meatCount - shawarmas.length }}</span>
          <button (click)="_meat.next('Meat')">Meat</button>
        </div>

        <div class="ingredient">
          <span>Remaining: {{ yogurtSauceCount - shawarmas.length }}</span>
          <button (click)="_yogurtSauce.next('Yogurt Sauce')">
            Yogurt Sauce
          </button>
        </div>

        <div class="ingredient">
          <span>Remaining: {{ spicesCount - shawarmas.length }}</span>
          <button (click)="_spices.next('Spices')">Spices</button>
        </div>

        <div class="ingredient">
          <span>Remaining: {{ tomatoCount - shawarmas.length }}</span>
          <button (click)="_tomato.next('Tomato')">Tomato</button>
        </div>

        <div class="ingredient">
          <span>Remaining: {{ lemonJuiceCount - shawarmas.length }}</span>
          <button (click)="_lemonJuice.next('Lemon Juice')">Lemon Juice</button>
        </div>
      </div>

      <div>
        <ng-container *ngIf="shawarma$ | async as shawarma">
          <section *ngIf="shawarma && shawarma.length > 0">
            <h4>Enjoy {{ shawarmas.length }} Shawarma(s)</h4>
            @for (shawarma of shawarmas; track shawarma) {
              <img src="assets/shawarma.png" alt="shawarma" />
            }
            <div>
              <h5>Ingredients:</h5>
              <pre>{{ shawarma | json }}</pre>
            </div>
          </section>
        </ng-container>
      </div>
    </div>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Shawarma Maker 3000';
  shawarma$!: Observable<Shawarma>;

  _flatBread = new Subject<'Flat Bread'>();
  _meat = new Subject<'Meat'>();
  _yogurtSauce = new Subject<'Yogurt Sauce'>();
  _spices = new Subject<'Spices'>();
  _tomato = new Subject<'Tomato'>();
  _lemonJuice = new Subject<'Lemon Juice'>();

  shawarmas: Array<Shawarma> = [];

  flatBreadCount = 0;
  meatCount = 0;
  yogurtSauceCount = 0;
  spicesCount = 0;
  tomatoCount = 0;
  lemonJuiceCount = 0;

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
      tap((shawarma) => {
        console.log('Shawarma is done!:', shawarma);
        this.shawarmas.push(shawarma);
      }),
    );
  }
}
