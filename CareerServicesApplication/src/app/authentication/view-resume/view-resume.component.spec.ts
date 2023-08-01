import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResumeComponent } from './view-resume.component';

describe('ViewResumeComponent', () => {
  let component: ViewResumeComponent;
  let fixture: ComponentFixture<ViewResumeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewResumeComponent]
    });
    fixture = TestBed.createComponent(ViewResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
