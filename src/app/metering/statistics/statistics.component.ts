import {Component, OnInit, Type, ViewChild} from '@angular/core';
import {DataReloadEvent, TableColumn, TableComponent, TableDetailPage} from '@serengeti/serengeti-common';
import {ChartType} from 'chart.js';
import {BaseChartDirective, Label} from 'ng2-charts';
import {MeteringDetailTableComponent} from '../detail/detail-table/detail-table.component';
import {MeteringService} from '../service/metering.service';
import {ExcelService} from './excel.service';
import {Statistics} from './Statistics';
import {StatisticsDetailTableComponent} from './statistics-detail-table/statistics-detail-table.component';
import {StatisticsExcel} from './StatisticsExcel';

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

  selectCloud = null;

  meteringOriginStatisticsList = [];
  meteringStatisticsList: Statistics[] = [];

  currentCondition: DataReloadEvent;
  @ViewChild('meteringStatistics', {static: true}) list: TableComponent;
  columns: TableColumn[] = [
    new TableColumn('cloudName', 'metering.statistics.cloud'),
    new TableColumn('statisticsDayTime', 'metering.statistics.time'),
    new TableColumn('cpu', 'metering.statistics.cpu'),
    new TableColumn('gpu', 'metering.statistics.gpu'),
    new TableColumn('memory', 'metering.statistics.memory'),
    new TableColumn('disk', 'metering.statistics.disk')
  ];

  constructor(
    private meteringService: MeteringService,
    private excelService: ExcelService
  ) {
    this.currentCondition = new DataReloadEvent('statisticsDay', 'desc', 0, 15);
    const currentDate = new Date(); // 현재 날짜를 얻음
    const year = currentDate.getFullYear(); // 현재 년도를 얻음
    const month = currentDate.getMonth(); // 현재 월을 얻음

    this.startDate = new Date(year, month, 1);
    this.endDate = new Date(year, month + 1, 0);
  }

  @ViewChild(BaseChartDirective, {static: false}) chart?: BaseChartDirective;

  public chartLabels: Label[] = [];
  public chartData = [
    {data: [], label: 'CPU', backgroundColor: 'rgba(0, 0, 0, 0)', type: 'line', yAxisID: 'left-axis'},
    {data: [], label: 'GPU', backgroundColor: 'rgba(0, 0, 0, 0)', type: 'line', yAxisID: 'left-axis'},
    {data: [], label: 'MEMORY', type: 'bar', yAxisID: 'right-axis'},
    {data: [], label: 'DISK', backgroundColor: 'rgba(0, 0, 0, 0.7)', type: 'bar', yAxisID: 'right-axis'}
  ];
  public chartType: ChartType = 'line';
  public chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        onClick: this.chartClick.bind(this)
      }
    },
    scales: {
      yAxes: [
        {
          id: 'left-axis',
          position: 'left',
          scaleLabel: {
            display: true,
            labelString: 'EA'
          }
        },
        {
          id: 'right-axis',
          position: 'right',
          scaleLabel: {
            display: true,
            labelString: 'Gi'
          }
        }
      ]
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
    if (!this.selectCloud) {
      alert('클라우드를 선택해 주세요');
      return;
    }

    if (this.startDate === null || this.endDate === null) {
      alert('날짜를 지정해 주세요');
      return;
    }

    this.doSearch();
  }

  public doSearch(condition?: DataReloadEvent) {
    if (condition) {
      this.currentCondition = condition;
    } else {
      condition = this.currentCondition;
    }

    const startDate = new Date(this.startDate.getTime());
    const endDate = new Date(this.endDate.getTime());
    this.day = startDate.toDateString() === endDate.toDateString();
    if (this.day) {
      condition.active = 'statisticsTime';
    } else {
      condition.active = 'statisticsDay';
    }

    this.meteringService.getMeteringStatistics(this.selectCloud.cloudId, this.formatDate(startDate), this.formatDate(endDate))
      .subscribe((result) => {
        this.meteringOriginStatisticsList = result.slice();
        this.chartLabels = [];
        this.chartData.forEach((data) => {
          data.data = [];
        });
        this.meteringStatisticsList = [];
        if (this.day) {
          // 같은 날짜인 경우
          this.statisticsSetting(result);
          for (let hour = 0; hour < 24; hour++) {
            this.chartLabels.push(hour.toString());
            const metering = this.selectStatisticsOfCurrentDate(hour.toString(), result);
            this.chartDataSetting(metering);
          }
          this.columns[1] = new TableColumn('statisticsDayTime', 'metering.statistics.time');
        } else {
          // 다른 날짜인 경우
          this.statisticsSetting(result);

          while (startDate <= endDate) {
            const dateString = startDate.toLocaleDateString();
            this.chartLabels.push(dateString);
            startDate.setDate(startDate.getDate() + 1);
            const metering = this.selectStatisticsOfCurrentDate(dateString, result);
            this.chartDataSetting(metering);
          }
          this.columns[1] = new TableColumn('statisticsDayTime', 'metering.statistics.day');
        }
        this.list.refresh(this.meteringStatisticsList.length, this.meteringStatisticsList, this.columns, condition);
      });
  }

  public selectStatisticsOfCurrentDate(date, meteringStatisticsList): any {
    for (const statistics of meteringStatisticsList) {
      let statisticsTime = null;
      if (this.day) {
        statisticsTime = statistics.statisticsTime.substring(0, 2);
        if (statisticsTime.startsWith('0')) {
          statisticsTime = statisticsTime.substring(1, 2);
        }
        if (statisticsTime === date) {
          return statistics;
        }
      } else {
        statisticsTime = new Date(statistics.statisticsDay);
        statisticsTime.setHours(0, 0, 0, 0);
        date = new Date(date);
        date.setHours(0, 0, 0, 0);
        if (statisticsTime.getTime() === date.getTime()) {
          return statistics;
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
    }
    if (this.endDate._d) {
      this.endDate = new Date(this.endDate._d);
      this.endDate.setHours(23, 59, 59);
    }
  }

  private chartDataSetting(metering: any) {
    if (metering) {
      this.chartData[0].data.push(metering.cpu);
      this.chartData[1].data.push(metering.gpu);
      this.chartData[2].data.push(metering.memory);
      this.chartData[3].data.push(metering.disk);
    } else {
      this.chartData[0].data.push(0);
      this.chartData[1].data.push(0);
      this.chartData[2].data.push(0);
      this.chartData[3].data.push(0);
    }
  }

  private statisticsSetting(result: any) {
    result.forEach((metering) => {
      const statistic: Statistics = new Statistics(metering, this.day, this.selectCloud.cloudName);
      this.meteringStatisticsList.push(statistic);
    });
  }

  excel() {
    const statisticsExcelList: StatisticsExcel[] = [];
    for (const meteringStatistics of this.meteringStatisticsList) {
      const statisticsExcel = new StatisticsExcel(meteringStatistics);
      statisticsExcelList.push(statisticsExcel);
    }
    this.excelService.exportToExcel(statisticsExcelList, 'test', 'test-sheet');
  }

  getDetailPageType(): Type<TableDetailPage>  {
    return StatisticsDetailTableComponent;
  }
}
