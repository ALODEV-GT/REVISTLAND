import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayerComponent } from './admin-layer.component';

describe('AdminLayerComponent', () => {
  let component: AdminLayerComponent;
  let fixture: ComponentFixture<AdminLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
