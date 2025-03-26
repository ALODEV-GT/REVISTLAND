import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedPage } from './published.page';

describe('PublishedPage', () => {
  let component: PublishedPage;
  let fixture: ComponentFixture<PublishedPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishedPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
