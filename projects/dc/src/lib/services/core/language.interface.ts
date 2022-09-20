export interface IDCLanguage {
  type: TDCLanguageType;
  tag: string; // dom tag or shared component name
  attributes?: any; // object of element attributes
  data?: any; // component inputs data
  content?: TDCLanguageContent; // innerHTML
}

export type TDCLanguageType = 'dom' | 'component';

export type TDCLanguageContent = IDCLanguage | IDCLanguage[] | string;
