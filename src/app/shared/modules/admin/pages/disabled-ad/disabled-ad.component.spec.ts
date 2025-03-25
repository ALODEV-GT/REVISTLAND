import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabledAdComponent } from './disabled-ad.component';

describe('DisabledAdComponent', () => {
  let component: DisabledAdComponent;
  let fixture: ComponentFixture<DisabledAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisabledAdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisabledAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
