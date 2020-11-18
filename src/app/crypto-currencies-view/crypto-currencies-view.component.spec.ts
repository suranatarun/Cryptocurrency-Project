import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoCurrenciesViewComponent } from './crypto-currencies-view.component';

describe('CryptoCurrenciesViewComponent', () => {
  let component: CryptoCurrenciesViewComponent;
  let fixture: ComponentFixture<CryptoCurrenciesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoCurrenciesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoCurrenciesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
