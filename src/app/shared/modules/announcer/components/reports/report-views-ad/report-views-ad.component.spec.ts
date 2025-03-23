import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportViewsAdComponent } from './report-views-ad.component';

describe('ReportViewsAdComponent', () => {
  let component: ReportViewsAdComponent;
  let fixture: ComponentFixture<ReportViewsAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportViewsAdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportViewsAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
