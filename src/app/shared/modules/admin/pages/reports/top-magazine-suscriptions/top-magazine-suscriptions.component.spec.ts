import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMagazineSuscriptionsComponent } from './top-magazine-suscriptions.component';

describe('TopMagazineSuscriptionsComponent', () => {
  let component: TopMagazineSuscriptionsComponent;
  let fixture: ComponentFixture<TopMagazineSuscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopMagazineSuscriptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopMagazineSuscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
