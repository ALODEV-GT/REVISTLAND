import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncerLayerComponent } from './announcer-layer.component';

describe('AnnouncerLayerComponent', () => {
  let component: AnnouncerLayerComponent;
  let fixture: ComponentFixture<AnnouncerLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncerLayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncerLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
