import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialStocksComponent } from './potential-stocks.component';

describe('PotentialStocksComponent', () => {
  let component: PotentialStocksComponent;
  let fixture: ComponentFixture<PotentialStocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotentialStocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentialStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
