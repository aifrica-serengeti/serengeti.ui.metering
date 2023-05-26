import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartType} from 'chart.js';
import {BaseChartDirective, Label} from 'ng2-charts';
import {MeteringService} from '../service/metering.service';

@Component({
  selector: 'lib-metering-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  cloudList;

  startDate = null;
  endDate = null;
  day = false;

  selectCloud;

  meteringStatistics;
  isChartExpanded = false;

  constructor(
    private meteringService: MeteringService
  ) {
    const currentDate = new Date(); // 현재 날짜를 얻음
    const year = currentDate.getFullYear(); // 현재 년도를 얻음
    const month = currentDate.getMonth(); // 현재 월을 얻음

    this.startDate = new Date(year, month, 1);
    this.endDate = new Date(year, month + 1, 0);
    console.log('startDate => ' + this.startDate);
    console.log('endDate => ' + this.endDate);
  }

  @ViewChild(BaseChartDirective, {static: false}) chart?: BaseChartDirective;

  public lineChartLabels: Label[] = [];
  public lineChartData = [
    { data: [], label: 'CPU' },
    { data: [], label: 'GPU' },
    { data: [], label: 'MEMORY' },
    { data: [], label: 'DISK' }
  ];
  public lineChartType: ChartType = 'line';
  public lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        onClick: this.chartClick.bind(this)
      }
    }
  };

  public chartClick(event: any) {
    console.log(event);
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
    if (this.startDate === null || this.endDate === null) {
      alert('날짜를 지정해 주세요');
      return;
    }

    console.log(this.startDate);
    console.log(this.endDate);
    const startDate = new Date(this.startDate.getTime());
    const endDate = new Date(this.endDate.getTime());
    startDate.getDate()

    this.meteringService.getMeteringStatistics(this.selectCloud.cloudId, this.formatDate(startDate), this.formatDate(endDate))
      .subscribe((result) => {
        this.day = false;
        this.meteringStatistics = result;
        this.lineChartLabels = [];
        this.lineChartData = [
          { data: [], label: 'CPU' },
          { data: [], label: 'GPU' },
          { data: [], label: 'MEMORY' },
          { data: [], label: 'DISK' }
        ];

        if (startDate.toDateString() === endDate.toDateString()) {
          this.day = true;
          // 같은 날짜인 경우
          for (let hour = 0; hour < 24; hour++) {
            this.lineChartLabels.push(hour.toString());
            const metering = this.dataSetting(hour.toString(), result);
            if (metering) {
              this.lineChartData[0].data.push(metering.cpu);
              this.lineChartData[1].data.push(metering.gpu);
              this.lineChartData[2].data.push(metering.memory);
              this.lineChartData[3].data.push(metering.disk);
            } else {
              this.lineChartData[0].data.push(0);
              this.lineChartData[1].data.push(0);
              this.lineChartData[2].data.push(0);
              this.lineChartData[3].data.push(0);
            }

          }
        } else {
          console.log('not day');

          // 다른 날짜인 경우
          while (startDate <= endDate) {
            const dateString = startDate.toLocaleDateString();
            this.lineChartLabels.push(dateString);
            startDate.setDate(startDate.getDate() + 1);
            const metering = this.dataSetting(dateString, result);
            if (metering) {
              this.lineChartData[0].data.push(metering.cpu);
              this.lineChartData[1].data.push(metering.gpu);
              this.lineChartData[2].data.push(metering.memory);
              this.lineChartData[3].data.push(metering.disk);
            } else {
              this.lineChartData[0].data.push(0);
              this.lineChartData[1].data.push(0);
              this.lineChartData[2].data.push(0);
              this.lineChartData[3].data.push(0);
            }
          }
        }
    });
  }

  public dataSetting(date, meteringStatistics): any {
    for (const meteringValue of meteringStatistics) {
      let statisticsTime = null;
      if (this.day) {
        statisticsTime = meteringValue.statisticsTime.substring(0, 2);
        if (statisticsTime.startsWith('0')) {
          statisticsTime = statisticsTime.substring(1, 2);
        }
        console.log(statisticsTime + ' / ' + date);
        if (statisticsTime === date) {
          const index = meteringStatistics.indexOf(meteringValue);
          meteringStatistics.splice(index, 1);
          return meteringValue;
        }
      } else {
        statisticsTime = new Date(meteringValue.statisticsDay);
        statisticsTime.setHours(0, 0, 0, 0);
        date = new Date(date);
        date.setHours(0, 0, 0, 0);
        if (statisticsTime.getTime() === date.getTime()) {
          return meteringValue;
        }
      }
    }
    return null;
  }

  public formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}${month}${day} ${hours}:${minutes}:${seconds}`;
  }

  dateFormat() {
    if (this.startDate._d) {
      this.startDate = new Date(this.startDate._d);
      console.log(this.startDate);
    }
    if (this.endDate._d) {
      this.endDate = new Date(this.endDate._d);
      this.endDate.setHours(23, 59, 59);
    }
  }

  toggleChartSize() {
    this.isChartExpanded = !this.isChartExpanded;
  }
}
