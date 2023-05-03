import { NgModule } from '@angular/core';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: 'assets/i18n/common/', suffix: '.json' },
    { prefix: 'assets/i18n/metering/', suffix: '.json' }
  ]);
}

const translationOptions = {
  loader: {
    provide: TranslateLoader,
    useFactory: createTranslateLoader,
    deps: [HttpClient]
  }
};

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot(translationOptions)
  ],
  exports: [TranslateModule],
  providers: [TranslateService]
})
export class MarketTranslationModule {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('ko-kr');
    translate.use('ko-kr');
  }
}
