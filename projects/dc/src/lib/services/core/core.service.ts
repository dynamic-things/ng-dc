import {
  Injectable,
  ComponentFactoryResolver,
  Injector,
  ApplicationRef,
  EmbeddedViewRef,
} from '@angular/core';
import {
  IDCLanguage,
  TDCLanguageContent,
} from './language.interface';
// services
import { DCSharedService } from '../shared/shared.service';
import { UtilsService } from '../utils/utils.service';
// interfaces
import {
  IDCCoreRenderDOMParam,
  IDCCoreRenderDOMReturn,
  IDCCoreRenderTemplateParam,
  IDCCoreRenderTemplateReturn,
} from './core.interface';

@Injectable({
  providedIn: 'root',
})
export class DCCoreService {
  constructor(
    protected Shared: DCSharedService,
    private utils: UtilsService,
    private factory: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  public Render(element: HTMLElement, language: IDCLanguage) {
    switch (language.type) {
      case 'dom':
        this.RenderDOM({
          parent: element,
          tag: language.tag,
          attributes: this.utils.ObjectToMap(language.attributes),
          content: language.content,
        });
        break;
      case 'component':
        this.RenderTemplate({
          parent: element,
          name: language.tag,
          attributes: this.utils.ObjectToMap(language.attributes),
          content: language.content,
          inputs: this.utils.ObjectToMap(language.data),
        });
        break;

      default:
        break;
    }
  }

  public RenderContent(element: HTMLElement, content: TDCLanguageContent) {
    if (typeof content == 'string') {
      element.innerHTML += content;
    } else if (typeof content == 'object' && Array.isArray(content)) {
      for (let item of content) {
        this.Render(element, item);
      }
    } else if (typeof content == 'object') {
      this.Render(element, content);
    }
  }

  public RenderDOM(
    param: IDCCoreRenderDOMParam
  ): IDCCoreRenderDOMReturn | undefined {
    if (param.tag) {
      const element = document.createElement(param.tag);

      // passing attributes to element
      if (param.attributes instanceof Map && param.attributes.size != 0) {
        param.attributes.forEach((value, key) => {
          element.setAttribute(key, value);
        });
      }

      param.parent.appendChild(element);

      if (param.content) {
        this.RenderContent(element, param.content);
      }

      return {
        element: element,
      };
    } else {
      console.error('[DC Lite] dom need a tag name');
      return undefined;
    }
  }

  /**
   * Render a component in a template
   */
  public RenderTemplate(
    param: IDCCoreRenderTemplateParam
  ): IDCCoreRenderTemplateReturn | undefined {
    // get angular component class from shared component by name
    const component = this.Shared.GetSharedComponent(param.name);
    // check component exists
    if (component) {
      // create a factory for component
      const factory = this.factory.resolveComponentFactory(component);
      const ref = factory.create(this.injector);

      // passing inputs to component as @Input
      if (param.inputs instanceof Map && param.inputs.size != 0 && ref) {
        param.inputs.forEach((value, key) => {
          ref.setInput(key, value);
        });
      }

      this.appRef.attachView(ref.hostView);

      const element = (ref.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;

      // passing attributes to rendered component element
      if (
        param.attributes instanceof Map &&
        param.attributes.size != 0 &&
        ref
      ) {
        param.attributes.forEach((value, key) => {
          element.setAttribute(key, value);
        });
      }

      param.parent.appendChild(element);

      setTimeout(() => {
        // render content
        if (param.content) {
          this.RenderContent(param.parent, param.content);
        }
      }, 0);

      return {
        ref: ref,
        factory: factory,
        element: element,
      };
    } else {
      // component not exists
      console.error(
        `[DC Lite] component with name '${param.name}' not exists in DCSharedService`
      );
      return undefined;
    }
  }
}
