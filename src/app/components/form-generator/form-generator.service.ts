import { EventEmitter, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDCLanguage } from 'projects/dc/src/lib/services/core/language.interface';

@Injectable({
  providedIn: 'root',
})
export class FormGeneratorService {
  public Layout: IDCLanguage[] = [];
  public FormGroup = new FormGroup<any>({});

  public LayoutChange: EventEmitter<void> = new EventEmitter();

  constructor() {}

  public Add(label: string, type: string, id: string) {
    this.Layout.push({
      type: 'dom',
      tag: 'div',
      attributes: {
        style: 'border: 1px solid #000; padding: 10px; margin: 10px;',
      },
      content: [
        {
          type: 'component',
          tag: 'dc-input',
          data: {
            label: label,
            type: type,
            id: id,
          },
        },
      ],
    });
    this.FormGroup.addControl(id, new FormControl('', [Validators.required]));
    this.LayoutChange.emit();
  }
}
