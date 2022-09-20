import { Component, Input, ViewContainerRef } from '@angular/core';
import { DCCoreService } from '../../services/core/core.service';
import { IDCLanguage } from '../../services/core/language.interface';

@Component({
  selector: 'dc-view',
  template: '',
})
export class DCViewComponent {
  @Input('layout')
  public layout: IDCLanguage[] = []

  constructor(private vc: ViewContainerRef, private core: DCCoreService) {}

  public Render() {
     // clear view container ref
     this.vc.clear();
     // clear innerHTML
     this.vc.element.nativeElement.innerHTML = '';
    // render all layout item
    for (let item of this.layout) {
      this.core.Render(this.vc.element.nativeElement, item);
    }
  }

  private ngAfterViewInit(): void {
    this.Render()
  }
}
