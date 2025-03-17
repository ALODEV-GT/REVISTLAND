import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAdLayerComponent } from './report-ad-layer.component';

describe('ReportAdLayerComponent', () => {
  let component: ReportAdLayerComponent;
  let fixture: ComponentFixture<ReportAdLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportAdLayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportAdLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
