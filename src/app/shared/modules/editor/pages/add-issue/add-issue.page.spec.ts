import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIssuePage } from './add-issue.page';

describe('AddIssueComponent', () => {
  let component: AddIssuePage;
  let fixture: ComponentFixture<AddIssuePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddIssuePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIssuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
