import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcInputComponent } from './dc-input.component';

describe('DcInputComponent', () => {
  let component: DcInputComponent;
  let fixture: ComponentFixture<DcInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DcInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
