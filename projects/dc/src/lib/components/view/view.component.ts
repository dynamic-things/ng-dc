import { Component, Input, ViewContainerRef } from '@angular/core';
import { DCCoreService } from '../../services/core/core.service';
import { IDCLanguage } from '../../services/core/language.interface';

@Component({
  selector: 'dc-view',
  template: '',
})
export class DCViewComponent {
  @Input('layout')
  public layout: IDCLanguage[] = [];

  constructor(private vc: ViewContainerRef, private core: DCCoreService) {}

  private ngAfterViewInit(): void {
    for (let item of this.layout) {
      this.core.Render(this.vc.element.nativeElement, item);
    }
  }
}
