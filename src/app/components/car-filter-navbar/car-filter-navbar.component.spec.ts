import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarFilterNavbarComponent } from './car-filter-navbar.component';

describe('CarFilterNavbarComponent', () => {
  let component: CarFilterNavbarComponent;
  let fixture: ComponentFixture<CarFilterNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarFilterNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarFilterNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
