import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DynamicComponentModule } from 'projects/dc/src/public-api';

import { AppComponent } from './app.component';
import { ContentComponent } from './components/content/content.component';

@NgModule({
  declarations: [AppComponent, ContentComponent],
  imports: [
    BrowserModule,
    DynamicComponentModule.forRoot({
      components: [
        {
          name: 'content',
          component: ContentComponent,
        },
      ],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
