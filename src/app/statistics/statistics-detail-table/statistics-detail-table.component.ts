import {Component, OnInit, Type, ViewChild} from '@angular/core';
import {DataReloadEvent, TableColumn, TableComponent, TableDetailPage, TableElement} from '@serengeti/serengeti-common';
import {MeteringDetailLogComponent} from '../../metering/detail/detail-log/detail-log.component';
import {MeteringLog} from '../../metering/detail/detail-table/MeteringLog';
import {MeteringService} from '../../metering/service/metering.service';
import {Statistics} from '../Statistics';

@Component({
  selector: 'lib-metering-statistics-detail-table',
  templateUrl: './statistics-detail-table.component.html',
  styleUrls: ['./statistics-detail-table.component.scss']
})
export class StatisticsDetailTableComponent implements OnInit, TableDetailPage {

  meteringLogList: MeteringLog[] = [];

  statistics: Statistics;

  columns;
  currentCondition: DataReloadEvent;
  @ViewChild('meteringLogCurrentList', {static: true}) list: TableComponent;

  constructor(private meteringService: MeteringService) {
    this.currentCondition = new DataReloadEvent('updatedDate', 'asc', 0, 10);
    this.columns = [
      new TableColumn('meteringName', 'metering.list.metering.name'),
      new TableColumn('meteringType', 'metering.list.metering.type'),
      new TableColumn('state', 'metering.list.metering.current'),
      new TableColumn('cpu', 'metering.list.metering.cpu'),
      new TableColumn('gpu', 'metering.list.metering.gpu'),
      new TableColumn('memory', 'metering.list.metering.memory'),
      new TableColumn('disk', 'metering.list.metering.disk'),
      new TableColumn('updatedDate', 'metering.list.metering.request-date'),
    ];
  }

  ngOnInit() {
  }

  doRefresh(condition?: DataReloadEvent) {
    if (condition) {
      this.currentCondition = condition;
    } else {
      condition = this.currentCondition;
    }
    this.meteringLogList = [];

    this.meteringService.searchStatisticsDetail(
      condition.pageNumber,
      condition.pageSize,
      condition.active,
      condition.sortOrder,
      this.statistics.cloudId, this.statistics.statisticsDayTime, this.statistics.day).subscribe((result) => {
      result.content.forEach((metering) => {
        const meteringLog = new MeteringLog(metering);
        this.meteringLogList.push(meteringLog);
      });
      this.list.refresh(result.totalElements, this.meteringLogList, this.columns, condition);
    });
  }

  setContent(table: TableComponent, element: TableElement, columns: TableColumn[]): void {
    this.statistics = element.getData();
    this.doRefresh();
  }

  getDetailPageType(): Type<TableDetailPage> {
    return MeteringDetailLogComponent;
  }
}
