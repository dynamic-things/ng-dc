import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DCTemplateComponent } from './template.component';

describe('DCTemplateComponent', () => {
  let component: DCTemplateComponent;
  let fixture: ComponentFixture<DCTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DCTemplateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DCTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
