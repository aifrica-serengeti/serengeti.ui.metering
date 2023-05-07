import {ModuleWithProviders, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import {Configurations} from '../Configuration';
import {environment} from '../environments/environment';
import {SerengetiCommonUIModule} from '../modules/common.ui.module';
import {MaterialModule} from '../modules/material.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {MeteringDetailComponent} from './metering/detail/detail.component';
import {MeteringListComponent} from './metering/list/list.component';
import { StatisticsComponent } from './statistics/statistics.component';

export function getLoginEndPoint() {
  if (SerengetiMeteringModule.config && SerengetiMeteringModule.config.createTranslateLoader) {
    return Configurations.getServiceLoginEndPoint(SerengetiMeteringModule.config);
  } else {
    return Configurations.serviceLoginCoreEndPoint;
  }
}

export function getProduction(): boolean {
  if (SerengetiMeteringModule.config && SerengetiMeteringModule.config.createTranslateLoader) {
    return true;
  } else {
    return environment.production;
  }
}

export function createTranslateLoader(http: HttpClient) {
  if (SerengetiMeteringModule.config && SerengetiMeteringModule.config.createTranslateLoader) {
    return SerengetiMeteringModule.config.createTranslateLoader(http);
  } else {
    return new MultiTranslateHttpLoader(http, [
      {prefix: 'assets/i18n/metering/', suffix: '.json'},
    ]);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MeteringListComponent,
    MeteringDetailComponent,
    StatisticsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    RouterModule,
    SerengetiCommonUIModule,
  ],
  providers: [
    TranslateService,
    Configurations
  ],
  bootstrap: [AppComponent]
})
export class SerengetiMeteringModule {
  public static config: Configurations = null;

  constructor(translate: TranslateService, config: Configurations) {
    translate.setDefaultLang('ko-kr');
    translate.use('ko-kr');

    SerengetiMeteringModule.config = config;
  }

  public static forRoot(config: Configurations): ModuleWithProviders<any> {
    SerengetiMeteringModule.config = config;

    if (config.createTranslateLoader) {
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: config.createTranslateLoader,
          deps: [HttpClient]
        }
      });
    }
    return {
      ngModule: SerengetiMeteringModule,
      providers: [
        {provide: Configurations, useValue: config}
      ]
    };
  }
}
