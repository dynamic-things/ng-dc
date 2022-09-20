import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { DCCoreService } from '../../services/core/core.service';
import { DCDOMDoneEvent, DCDOMRef } from '..';
import { UtilsService } from '../../services/utils/utils.service';
import { TDCLanguageContent } from '../../services/core/language.interface';

@Component({
  selector: 'dc-dom',
  template: '',
})
export class DCDomComponent {
  // dom tag name
  @Input('tag')
  public tag: Required<string> = '';

  // Passing html attributes to component
  @Input('attributes')
  public attributes?: any;

  // Passing inner dom content
  @Input('content')
  public content?: TDCLanguageContent;

  // Refrence of this component for dynamic refrence name and accessbility
  @Input('ref')
  public ref!: DCDOMRef;

  @Output('refChange')
  private refChange: EventEmitter<DCDOMRef> = new EventEmitter();

  // After component render done and successful
  @Output('done')
  private done: EventEmitter<DCDOMDoneEvent> = new EventEmitter();

  constructor(
    private core: DCCoreService,
    private utils: UtilsService,
    private readonly vc: ViewContainerRef
  ) {}

  public Render() {
    setTimeout(() => {
      // clear view container ref
      this.vc.clear();
      // clear innerHTML
      this.vc.element.nativeElement.innerHTML = '';      

      const result = this.core.RenderDOM({
        parent: this.vc.element.nativeElement,
        tag: this.tag,
        attributes: this.utils.ObjectToMap(this.attributes),
        content: this.content,
      });

      // check render was successful
      if (result) {
        // set ref to host (dc-template) component
        this.refChange.emit(<any>this);
        this.ref = this;

        // emit template rendered
        this.done.emit({ ref: this });
      }
    }, 0);
  }

  public Destory() {
    // clear view container ref
    this.vc.clear();
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
