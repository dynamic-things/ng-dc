import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-content',
  template: '',
})
export class ContentComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input()
  public html: string = '';

  constructor(private readonly vc: ViewContainerRef) {}

  ngAfterViewInit(): void {
    this.vc.element.nativeElement.innerHTML = this.html;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    console.log('Destroied');
  }
}
