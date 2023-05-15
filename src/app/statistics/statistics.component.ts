import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {BaseChartDirective, Label, SingleDataSet} from 'ng2-charts';
import {MeteringService} from '../metering/metering.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  cloudList;

  startDate = null;
  endDate = null;

  resourceType;

  selectCloud;
  selectResourceType;

  meteringStatistics;

  constructor(
    private meteringService: MeteringService
  ) {
  }

  @ViewChild(BaseChartDirective, {static: false}) chart?: BaseChartDirective;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        color: 'white',
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        }
      }
    }
  };
  public pieChartLabels: Label[] = ['Image', 'Instance', 'LoadBalance', 'NetworkInterface', 'Volume'];
  public pieChartData: SingleDataSet = [0, 0, 0, 0, 0];
  public pieChartType: ChartType = 'pie';

  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

  ngOnInit() {
    this.searchCloud();
  }

  searchCloud() {
    this.meteringService.searchCloud().subscribe((result) => {
      this.cloudList = result;
      console.log(this.cloudList);
    });
  }

  search() {
    if (this.startDate === null || this.endDate === null) {
      alert('날짜를 지정해 주세요');
      return;
    }
    const startDate = this.dateFormat(this.startDate._d);
    const endDate = this.dateFormat(this.endDate._d);

    this.meteringService.getMeteringStatistics(this.selectCloud.cloudId, startDate, endDate).subscribe((result) => {
      this.meteringStatistics = result;
      this.pieChartData = [];
      this.pieChartData.push(result.image);
      this.pieChartData.push(result.instance);
      this.pieChartData.push(result.loadBalance);
      this.pieChartData.push(result.networkInterface);
      this.pieChartData.push(result.volume);
    });
  }

  public dateFormat(date: any): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }

  public selectedCloud(cloud: any) {
    this.selectCloud = cloud;
  }

  public selectedResourceType(event: any) {
    this.selectResourceType = event;
    this.meteringService.searchResourceType(this.selectCloud.cloudId, this.selectResourceType, this.startDate, this.endDate).subscribe((result) => {
      console.log(result);
    });
  }
}
