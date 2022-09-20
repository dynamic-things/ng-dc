import {
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { DCTemplateDoneEvent, DCTemplateRef } from '..';
import { DCCoreService } from '../../services/core/core.service';
import { TDCLanguageContent } from '../../services/core/language.interface';
import { UtilsService } from '../../services/utils/utils.service';

@Component({
  selector: 'dc-template',
  template: '',
})
export class DCTemplateComponent {
  // Angular component name
  @Input('name')
  public name: Required<string> = '';

  // Passing data to component by Angular input
  @Input('data')
  public data?: any;

  // Passing html attributes to component
  @Input('attributes')
  public attributes?: any;

  // Passing inner component content
  @Input('content')
  public content?: TDCLanguageContent;

  // Refrence of this component for dynamic refrence name and accessbility
  @Input('ref')
  public ref!: DCTemplateRef;

  @Output('refChange')
  private refChange: EventEmitter<DCTemplateRef> = new EventEmitter();

  // After component render done and successful
  @Output('done')
  private done: EventEmitter<DCTemplateDoneEvent> = new EventEmitter();

  // rendered component refrance
  public Component!: ComponentRef<any>;

  constructor(
    private core: DCCoreService,
    private utils: UtilsService,
    private readonly vc: ViewContainerRef
  ) {}

  public Render() {
    setTimeout(() => {
      // clear view container ref
      this.vc.clear();
      // destroy pre rendered component
      if (this.Component) this.Component.destroy();
      // clear innerHTML
      this.vc.element.nativeElement.innerHTML = '';

      const result = this.core.RenderTemplate({
        parent: this.vc.element.nativeElement,
        name: this.name,
        attributes: this.utils.ObjectToMap(this.attributes),
        content: this.content,
        inputs: this.utils.ObjectToMap(this.data),
      });

      // check render was successful
      if (result) {
        // set ref to host (dc-template) component
        this.refChange.emit(<any>this);
        this.ref = this;

        // emit template rendered
        this.done.emit({ ref: this });

        // set component refrence
        this.Component = result.ref;

        // detect on destroy component
        result.ref.onDestroy(() => {
          this.Destory();
        });
      }
    }, 0);
  }

  public Destory() {
    // clear view container ref
    this.vc.clear();
    // destroy rendered component
    this.Component.destroy();
    // check dc-template exists
    if (this.vc.element.nativeElement) {
      // remove self
      (<HTMLElement>this.vc.element.nativeElement)!.parentElement!.removeChild(
        this.vc.element.nativeElement
      );
    }
    // unsubscribe event emitter
    this.refChange.unsubscribe();
    this.done.unsubscribe();
  }

  private ngAfterViewInit(): void {
    this.Render();
  }
}
