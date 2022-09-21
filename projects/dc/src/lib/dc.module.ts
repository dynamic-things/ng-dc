import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DCTemplateComponent } from './components/template/template.component';
import { DCViewComponent } from './components/view/view.component';
import { DCDomComponent } from './components/dom/dom.component';
import { FactoryService } from './services/factory/factory.service';
import { StaticDynamicComponentModule } from './static-dc.module';

@NgModule({
  declarations: [DCTemplateComponent, DCViewComponent, DCDomComponent],
  imports: [CommonModule],
  exports: [DCTemplateComponent, DCViewComponent, DCDomComponent],
})
export class DynamicComponentModule {
  static forRoot(
    params: ForRootParams
  ): ModuleWithProviders<DynamicComponentModule> {
    return {
      ngModule: StaticDynamicComponentModule,
      providers: [
        {
          provide: FactoryService,
          useValue: {
            SharedComponents: params.components
              .concat([
                {
                  name: 'dc-template',
                  component: DCTemplateComponent,
                },
                {
                  name: 'dc-dom',
                  component: DCDomComponent,
                },
              ])
              .reduce(
                (prev, curr) => ({ ...prev, [curr.name]: curr.component }),
                {}
              ),
          },
        },
      ],
    };
  }
}

interface ForRootParams {
  components: ForRootComponentItem[];
}

interface ForRootComponentItem {
  name: string;
  component: Type<any>;
}
