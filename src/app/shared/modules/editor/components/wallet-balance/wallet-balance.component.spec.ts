import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletBalancePage } from './wallet-balance.component';

describe('WalletBalanceComponent', () => {
  let component: WalletBalancePage;
  let fixture: ComponentFixture<WalletBalancePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletBalancePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletBalancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
