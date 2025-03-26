import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedIssuesPage } from './published-issues.page';

describe('PublishedIssuesPage', () => {
  let component: PublishedIssuesPage;
  let fixture: ComponentFixture<PublishedIssuesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishedIssuesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishedIssuesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
