import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {MeteringDetailLogComponent} from './metering/detail-log/detail-log.component';
import {MeteringDetailListComponent} from './metering/detail/detail.component';
import {MeteringListComponent} from './metering/list/list.component';
import {StatisticsComponent} from './metering/statistics/statistics.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'main', component: HomeComponent, children: [
      { path: 'metering/list', component: MeteringListComponent, outlet: 'content', data: { title: 'metering.title', root: true}},
      { path: 'metering/detail/:id', component: MeteringDetailListComponent, outlet: 'content', data: { title: 'metering.detail', root: true}},
      { path: 'metering/detail/log/:id', component: MeteringDetailLogComponent, outlet: 'content', data: { title: 'metering.detail.log', root: true}},
      { path: 'metering/statistics', component: StatisticsComponent, outlet: 'content', data: { title: 'metering.statistics', root: true}}

    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
