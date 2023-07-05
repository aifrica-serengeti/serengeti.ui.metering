import {Component, Input, OnChanges, OnInit, Type, ViewChild} from '@angular/core';
import {DataReloadEvent, TableColumn, TableComponent, TableDetailPage} from '@serengeti/serengeti-common';
import {ChartType} from 'chart.js';
import {BaseChartDirective, Label} from 'ng2-charts';
import {ExcelService} from '../excel.service/excel.service';
import {StatisticsService} from '../service/statistics.service';
import {Statistics} from '../Statistics';
import {StatisticsDetailTableComponent} from '../statistics-detail-table/statistics-detail-table.component';
import {StatisticsExcel} from '../StatisticsExcel';

@Component({
  selector: 'lib-statistics-chart-table',
  templateUrl: './chart-table.component.html',
  styleUrls: ['./chart-table.component.scss']
})
export class StatisticsChartTableComponent implements OnInit, OnChanges {

  @Input() cloud;
  @Input() startDate: Date;
  @Input() endDate: Date;
  day;

  meteringOriginStatisticsList = [];
  meteringStatisticsList: Statistics[] = [];

  meteringOriginTableList;
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

  @ViewChild(BaseChartDirective, {static: false}) chart?: BaseChartDirective;

  public chartLabels: Label[] = [];
  public chartData = [
    {data: [], label: 'CPU', backgroundColor: 'rgba(0, 0, 0, 0)', type: 'line', yAxisID: 'left-axis'},
    {data: [], label: 'GPU', backgroundColor: 'rgba(0, 0, 0, 0)', type: 'line', yAxisID: 'left-axis'},
    {data: [], label: 'MEMORY', backgroundColor: '#F2D399', type: 'bar', yAxisID: 'right-axis'},
    {data: [], label: 'DISK', backgroundColor: '#9AD9D2', type: 'bar', yAxisID: 'right-axis'}
  ];
  public chartType: ChartType = 'line';
  public chartOptions = {
    responsive: true,
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

  constructor(private statisticsService: StatisticsService, private excelService: ExcelService) {
    this.currentCondition = new DataReloadEvent('statisticsDay', 'desc', 0, 15);
  }

  ngOnInit() {
    this.doSearch();
  }

  ngOnChanges(changes): void {
    this.doSearch();
  }

  public doSearch(condition?: DataReloadEvent) {
    if (condition) {
      this.currentCondition = condition;
      this.tablePaging(condition);
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

    this.statisticsService.getMeteringStatistics(
      this.cloud.cloudId,
      this.statisticsService.dateFormat(startDate),
      this.statisticsService.dateFormat(endDate))
      .subscribe((result) => {
        this.meteringOriginStatisticsList = result.slice();
        this.meteringOriginTableList = result.slice();
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

        this.tablePaging(this.currentCondition);
      });
  }

  public tablePaging(condition: DataReloadEvent) {
    let pageStartIndex = 0;
    const pageSize = (condition.pageNumber + 1) * condition.pageSize;
    if (condition.pageNumber > 0) {
      pageStartIndex = (condition.pageNumber * condition.pageSize);
    }
    this.list.refresh(
      this.meteringStatisticsList.length,
      this.meteringStatisticsList.slice(pageStartIndex, pageSize),
      this.columns,
      condition);
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
      const statistic: Statistics = new Statistics(metering, this.day, this.cloud);
      this.meteringStatisticsList.push(statistic);
    });
  }

  excel() {
    const statisticsExcelList: StatisticsExcel[] = [];
    for (const meteringStatistics of this.meteringStatisticsList) {
      const statisticsExcel = new StatisticsExcel(meteringStatistics);
      statisticsExcelList.push(statisticsExcel);
    }

    this.excelService.exportToExcel(statisticsExcelList, this.cloud.cloudName, this.statisticsService.dateFormat(this.startDate));
  }

  getDetailPageType(): Type<TableDetailPage> {
    return StatisticsDetailTableComponent;
  }

  statistice() {
    this.statisticsService.oneCloudStatistics(
      this.cloud.cloudId,
      this.statisticsService.dateFormat(this.startDate),
      this.statisticsService.dateFormat(this.endDate)).subscribe((result) => {
      this.doSearch();
    });
  }
}
