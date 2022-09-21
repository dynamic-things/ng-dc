import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DynamicComponentModule } from 'dist/dc';

import { AppComponent } from './app.component';
import { ContentComponent } from './components/content/content.component';
import { FormGeneratorComponent } from './components/form-generator/form-generator.component';
import { DcInputComponent } from './components/dc-input/dc-input.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    FormGeneratorComponent,
    DcInputComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicComponentModule.forRoot({
      components: [
        {
          name: 'content',
          component: ContentComponent,
        },
        {
          name: 'dc-input',
          component: DcInputComponent,
        },
      ],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
