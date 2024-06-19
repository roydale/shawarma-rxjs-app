import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShawarmaMakerComponent } from './shawarma-maker.component';

describe('ShawarmaMakerComponent', () => {
  let component: ShawarmaMakerComponent;
  let fixture: ComponentFixture<ShawarmaMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShawarmaMakerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShawarmaMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
