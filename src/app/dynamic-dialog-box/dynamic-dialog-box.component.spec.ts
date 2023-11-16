import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDialogBoxComponent } from './dynamic-dialog-box.component';

describe('DynamicDialogBoxComponent', () => {
  let component: DynamicDialogBoxComponent;
  let fixture: ComponentFixture<DynamicDialogBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicDialogBoxComponent]
    });
    fixture = TestBed.createComponent(DynamicDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
