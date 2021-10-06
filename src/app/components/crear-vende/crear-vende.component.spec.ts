import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearVendeComponent } from './crear-vende.component';

describe('CrearVendeComponent', () => {
  let component: CrearVendeComponent;
  let fixture: ComponentFixture<CrearVendeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearVendeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearVendeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
