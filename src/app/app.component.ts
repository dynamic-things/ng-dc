import { Component, OnInit } from '@angular/core';
import { DCSharedService } from 'projects/dc/src/lib/services/shared/shared.service';
import { DCTemplateDoneEvent, DCTemplateRef } from 'projects/dc/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public Ref!: DCTemplateRef;

  constructor(private shared: DCSharedService) {}

  ngOnInit(): void {}

  public Done(event: DCTemplateDoneEvent) {}
}
