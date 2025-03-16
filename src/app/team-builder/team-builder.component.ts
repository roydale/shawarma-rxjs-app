import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Member } from '../models/member.model';
import { Observable, Subject, map, of, take, tap, zip } from 'rxjs';
import { HttpClient } from '@angular/common/http';

type Alias = { id: number; name: string };
type Team = [Member, Member, Member, Member, Member];

@Component({
  selector: 'app-team-builder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-builder.component.html',
  styleUrl: './team-builder.component.scss',
})
export class TeamBuilderComponent implements OnInit {
  memberCount = 5;
  aliases: Alias[] = [];
  members: Member[] = faker.helpers.multiple(this.createRandomUser.bind(this), {
    count: this.memberCount,
  });

  team!: Observable<Team>;

  manager = new Subject<Member>();
  supervisor = new Subject<Member>();
  cook = new Subject<Member>();
  crew = new Subject<Member>();
  cashier = new Subject<Member>();

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getAliasData();
  }

  createRandomUser(): Member {
    const birthdateReceived = of(
      faker.date.birthdate({ min: 18, max: 60, mode: 'age' }),
    );

    let age = 0;
    let birthdate = '';
    birthdateReceived.pipe(take(1)).subscribe((date) => {
      birthdate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      age = this.getAge(date);
    });

    return {
      position: '',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      birthdate,
      alias: '',
      age,
    };
  }

  getRandomIds(min: number, max: number, count: number): number[] {
    const ids: number[] = [];
    let isNumberExist = false;
    if (count > max) {
      count = max;
    }

    for (let i = 0; i < count; i++) {
      do {
        if (ids.length === count) {
          break;
        }

        const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
        isNumberExist = ids.includes(randomNumber);
        if (!isNumberExist) {
          ids.push(randomNumber);
        }
      } while (isNumberExist);
    }
    return ids;
  }

  getAliasData() {
    const ids = this.getRandomIds(1, 200, this.memberCount);
    let index = 0;

    this.httpClient
      .get('/assets/data/alias.json')
      .pipe(
        take(1),
        map((data: any) => data.filter((item: Alias) => ids.includes(item.id))),
      )
      .subscribe((data: Alias[]) => {
        this.aliases = data;

        this.members.forEach((member) => {
          member.alias = this.aliases[index].name;
          index++;
        });

        this.team = zip(
          this.manager.pipe(
            map((data) => `${data}`),
            tap(console.log),
          ),
          this.supervisor.pipe(
            map((data) => `${data}`),
            tap(console.log),
          ),
          this.cook.pipe(
            map((data) => `${data}`),
            tap(console.log),
          ),
          this.crew.pipe(
            map((data) => `${data}`),
            tap(console.log),
          ),
          this.cashier.pipe(
            map((data) => `${data}`),
            tap(console.log),
          ),
        ).pipe(
          tap((team: Team) => {
            console.log(team);
          }),
        );

        this.team.subscribe((data) => {
          console.log(JSON.stringify(data));
        });
      });
  }

  getAge(birthdate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDifference = today.getMonth() - birthdate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthdate.getDate())
    ) {
      age--;
    }
    return age;
  }

  hireNew() {
    this.manager.next(this.members[0]);
    this.supervisor.next(this.members[1]);
    this.cook.next(this.members[2]);
    this.crew.next(this.members[3]);
    this.cashier.next(this.members[4]);
  }
}
