import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishIssueFormComponent } from './publish-issue-form.component';

describe('PublishIssueFormComponent', () => {
  let component: PublishIssueFormComponent;
  let fixture: ComponentFixture<PublishIssueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishIssueFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishIssueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
