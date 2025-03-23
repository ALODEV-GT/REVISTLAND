import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishPage } from './publish.page';

describe('PublishPage', () => {
  let component: PublishPage;
  let fixture: ComponentFixture<PublishPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
