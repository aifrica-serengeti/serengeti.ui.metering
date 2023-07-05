import {DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MeteringService} from '../metering/service/metering.service';
import {StatisticsService} from './service/statistics.service';

@Component({
  selector: 'lib-metering-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  today = new Date();

  cloudList;

  startDate = null;
  transferStartDate = null;
  endDate = null;
  transferEndDate = null;

  selectCloud = null;
  selectedCloud = [];

  constructor(
    private meteringService: MeteringService,
    private statisticsService: StatisticsService,
    private translateService: TranslateService,
  ) {
    const year = this.today.getFullYear(); // 현재 년도를 얻음
    const month = this.today.getMonth(); // 현재 월을 얻음

    this.startDate = new Date(year, month, 1);
    this.endDate = this.today;
  }

  ngOnInit() {
    this.searchCloud();
  }

  searchCloud() {
    this.meteringService.searchCloud().subscribe((result) => {
      this.cloudList = result;
    });
  }

  search() {
    this.translateService.get(['metering.statistics.search.cloud', 'metering.statistics.search.date']).subscribe((message) => {
      if (!this.selectCloud) {
        alert(message['metering.statistics.search.cloud']);
        return;
      }

      if (this.startDate === null || this.endDate === null) {
        alert(message['metering.statistics.search.date']);
        return;
      }
      this.selectedCloud = this.selectCloud.slice();
      this.transferStartDate = this.startDate;
      this.transferEndDate = this.endDate;
    });
  }

  dateFormat() {
    if (this.startDate._d) {
      this.startDate = new Date(this.startDate._d);
    }
    if (this.endDate._d) {
      this.endDate = new Date(this.endDate._d);
      this.endDate.setHours(23, 59, 59);
    }
  }
}
