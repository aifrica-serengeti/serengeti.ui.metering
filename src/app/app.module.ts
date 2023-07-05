import {CommonModule, DatePipe} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {ChartsModule, ThemeService} from 'ng2-charts';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import {Configurations} from '../Configuration';
import {environment} from '../environments/environment';
import {SerengetiCommonUIModule} from '../modules/common.ui.module';
import {MaterialModule} from '../modules/material.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './common/home/home.component';
import {MeteringDetailLogComponent} from './metering/detail/detail-log/detail-log.component';
import {MeteringDetailListComponent} from './metering/detail/detail.component';
import {MeteringListComponent} from './metering/list/list.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {StatisticsTestComponent} from './common/statistics-test/statistics-test.component';
import {MeteringDetailTableComponent} from './metering/detail/detail-table/detail-table.component';
import { StatisticsDetailTableComponent } from './statistics/statistics-detail-table/statistics-detail-table.component';
import { StatisticsChartTableComponent } from './statistics/chart-table/chart-table.component';

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
      {prefix: 'assets/i18n/common/', suffix: '.json'},

    ]);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MeteringListComponent,
    MeteringDetailListComponent,
    StatisticsComponent,
    MeteringDetailLogComponent,
    StatisticsTestComponent,
    MeteringDetailTableComponent,
    StatisticsDetailTableComponent,
    StatisticsChartTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    RouterModule,
    SerengetiCommonUIModule,
    NgxJsonViewerModule,
    CommonModule
  ],
  providers: [
    TranslateService,
    Configurations,
    ThemeService,
    DatePipe
  ],
  exports: [
    MeteringListComponent,
    MeteringDetailListComponent,
    StatisticsComponent,
    MeteringDetailLogComponent,
    MeteringDetailTableComponent,
    StatisticsDetailTableComponent,
    StatisticsChartTableComponent,
  ],
  entryComponents: [
    StatisticsDetailTableComponent
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
