import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSubscriberComponent } from './layout-subscriber.component';

describe('LayoutSubscriberComponent', () => {
  let component: LayoutSubscriberComponent;
  let fixture: ComponentFixture<LayoutSubscriberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutSubscriberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
