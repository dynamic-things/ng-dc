import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DCViewComponent } from './view.component';

describe('DCViewComponent', () => {
  let component: DCViewComponent;
  let fixture: ComponentFixture<DCViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DCViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DCViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
