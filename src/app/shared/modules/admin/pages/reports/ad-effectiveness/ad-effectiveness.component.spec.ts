import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdEffectivenessComponent } from './ad-effectiveness.component';

describe('AdEffectivenessComponent', () => {
  let component: AdEffectivenessComponent;
  let fixture: ComponentFixture<AdEffectivenessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdEffectivenessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdEffectivenessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
