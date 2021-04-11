import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkaAreaComponent } from './marka-area.component';

describe('MarkaAreaComponent', () => {
  let component: MarkaAreaComponent;
  let fixture: ComponentFixture<MarkaAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkaAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkaAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
