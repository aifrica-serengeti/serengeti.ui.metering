import { Component, OnInit } from '@angular/core';
import {MeteringService} from '../../metering/service/metering.service';
import {StatisticsService} from '../../statistics/service/statistics.service';

@Component({
  selector: 'app-statistics-test',
  templateUrl: './statistics-test.component.html',
  styleUrls: ['./statistics-test.component.scss']
})
export class StatisticsTestComponent implements OnInit {

  startDate;
  endDate;

  cloudList;
  selectCloud;

  constructor(private meteringService: MeteringService,
              private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.searchCloud();
  }

  searchCloud() {
    this.meteringService.searchCloud().subscribe((result) => {
      this.cloudList = result;
    });
  }

  currentStatistics() {
    this.statisticsService.currentStatistics().subscribe((result) => {

    });
  }
  allCloudStatistics() {
    if (!this.startDate || !this.endDate) {
      console.log('date null!!!');
      return;
    }
    this.statisticsService.allCloudStatistics(this.startDate, this.endDate).subscribe();
  }

  oneCloudStatistics() {
    console.log(this.selectCloud);
    if (!this.startDate || !this.endDate) {
      console.log('date null!!!');
      return;
    }
    this.statisticsService.oneCloudStatistics(this.selectCloud, this.startDate, this.endDate).subscribe();
  }

}
