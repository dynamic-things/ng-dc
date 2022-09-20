import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGeneratorService } from '../form-generator/form-generator.service';

@Component({
  selector: 'app-dc-input',
  templateUrl: './dc-input.component.html',
  styleUrls: ['./dc-input.component.scss']
})
export class DcInputComponent implements OnInit {
  @Input()
  public label: string = '';

  @Input()
  public type: string = '';

  @Input()
  public id: string = '';

  public control = new FormControl()

  constructor(public FormGenerator: FormGeneratorService) { }

  ngOnInit(): void {
    this.control = this.FormGenerator.FormGroup.controls[this.id]! as any
  }

}
