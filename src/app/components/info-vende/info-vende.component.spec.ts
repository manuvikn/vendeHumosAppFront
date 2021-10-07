import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoVendeComponent } from './info-vende.component';

describe('InfoVendeComponent', () => {
  let component: InfoVendeComponent;
  let fixture: ComponentFixture<InfoVendeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoVendeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoVendeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
