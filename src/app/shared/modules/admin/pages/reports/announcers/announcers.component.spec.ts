import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncersComponent } from './announcers.component';

describe('AnnouncersComponent', () => {
  let component: AnnouncersComponent;
  let fixture: ComponentFixture<AnnouncersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
