import {
  ComponentFactory,
  ComponentRef,
} from '@angular/core';
import { TDCLanguageContent } from './language.interface';

export interface IDCCoreRenderTemplateParam {
  parent: HTMLElement;
  name: string; // shared component name
  attributes?: Map<string, string>; // component html tag attributes
  inputs?: Map<string, any>;
  content?: TDCLanguageContent; // inner html content
}

export interface IDCCoreRenderTemplateReturn {
  ref: ComponentRef<any>;
  factory: ComponentFactory<any>;
  element: HTMLElement;
}

export interface IDCCoreRenderDOMParam {
  parent: HTMLElement;
  tag: string;
  attributes?: Map<string, string>; // component html tag attributes
  content?: TDCLanguageContent; // inner html content
}

export interface IDCCoreRenderDOMReturn {
  element: HTMLElement;
}
