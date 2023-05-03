import { NgModule } from '@angular/core';
import { SerengetiCommonModule } from '@serengeti/serengeti-common';
import { environment } from '../environments/environment';

const commonOptions = environment.commonOptions;

@NgModule({
  declarations: [
  ],
  imports: [
    SerengetiCommonModule.forRoot(commonOptions)
  ],
  exports: [
    SerengetiCommonModule
  ]
})
export class SerengetiCommonUIModule {
}
