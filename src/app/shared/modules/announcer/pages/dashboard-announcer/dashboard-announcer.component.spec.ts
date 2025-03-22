import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAnnouncerComponent } from './dashboard-announcer.component';

describe('DashboardAnnouncerComponent', () => {
  let component: DashboardAnnouncerComponent;
  let fixture: ComponentFixture<DashboardAnnouncerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAnnouncerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAnnouncerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
