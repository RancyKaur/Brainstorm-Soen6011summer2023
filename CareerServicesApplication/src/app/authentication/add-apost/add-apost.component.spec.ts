import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAPostComponent } from './add-apost.component';

describe('AddAPostComponent', () => {
  let component: AddAPostComponent;
  let fixture: ComponentFixture<AddAPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAPostComponent]
    });
    fixture = TestBed.createComponent(AddAPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
