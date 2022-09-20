import { Component, OnInit } from '@angular/core';
import { FormGeneratorService } from './form-generator.service';

@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.scss'],
})
export class FormGeneratorComponent implements OnInit {
  public Label: string = '';
  public Type: string = 'text';
  public Id: string = Date.now().toString();

  constructor(public FormGenerator: FormGeneratorService) {}

  ngOnInit(): void {}

  public Save() {
    this.FormGenerator.Add(this.Label, this.Type, this.Id);
    this.Label = '';
    this.Type = 'text';
    this.Id = Date.now().toString();
  }
}
