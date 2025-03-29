import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMagazineComentsComponent } from './top-magazine-coments.component';

describe('TopMagazineComentsComponent', () => {
  let component: TopMagazineComentsComponent;
  let fixture: ComponentFixture<TopMagazineComentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopMagazineComentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopMagazineComentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
