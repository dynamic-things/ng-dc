import { Component, OnInit, ViewChild } from '@angular/core';
import { DCViewRef } from 'dist/dc';
import { FormGeneratorService } from './components/form-generator/form-generator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(DCViewRef, { static: true })
  private view!: DCViewRef;

  constructor(public FormGenerator: FormGeneratorService) {}

  ngOnInit(): void {
    this.FormGenerator.LayoutChange.subscribe(() => {
      this.view.Render();
    });
  }

  public Save() {
    this.FormGenerator.FormGroup.markAllAsTouched();
    console.log(this.FormGenerator.FormGroup.valid);
    console.log(this.FormGenerator.FormGroup.value);
  }
}
