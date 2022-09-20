import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DCTemplateComponent } from './components/template/template.component';
import { DCViewComponent } from './components/view/view.component';
import { DCDomComponent } from './components/dom/dom.component';

@NgModule({
  declarations: [DCTemplateComponent, DCViewComponent, DCDomComponent],
  imports: [CommonModule],
  exports: [DCTemplateComponent, DCViewComponent, DCDomComponent],
})
export class StaticDynamicComponentModule {}
