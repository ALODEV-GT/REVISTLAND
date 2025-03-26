import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazineCardComponent } from './magazine-card.component';

describe('MagazineCardComponent', () => {
  let component: MagazineCardComponent;
  let fixture: ComponentFixture<MagazineCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagazineCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagazineCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
