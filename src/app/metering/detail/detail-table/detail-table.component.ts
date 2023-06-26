import {Component, Input, OnInit, Type, ViewChild} from '@angular/core';
import {DataReloadEvent, TableColumn, TableComponent, TableDetailPage} from '@serengeti/serengeti-common';
import {MeteringService} from '../../service/metering.service';
import {Statistics} from '../../../statistics/Statistics';
import {MeteringDetailLogComponent} from '../detail-log/detail-log.component';

@Component({
  selector: 'lib-metering-detail-table',
  templateUrl: './detail-table.component.html',
  styleUrls: ['./detail-table.component.scss']
})
export class MeteringDetailTableComponent implements OnInit {

  currentCondition: DataReloadEvent;

  meteringLogList;
  currentMeteringLog;

  statistics: Statistics;

  columns;
  @ViewChild('meteringLogList', {static: true}) list: TableComponent;

  @Input() meteringId;
  @Input() metering;

  constructor(private meteringService: MeteringService) {
    this.currentCondition = new DataReloadEvent('updatedDate', 'asc', 0, 10);
    this.columns = [
      new TableColumn('state', 'metering.list.metering.state'),
      new TableColumn('cpu', 'metering.list.metering.cpu'),
      new TableColumn('gpu', 'metering.list.metering.gpu'),
      new TableColumn('memory', 'metering.list.metering.memory'),
      new TableColumn('disk', 'metering.list.metering.disk'),
      new TableColumn('updatedDate', 'metering.list.metering.request-date'),
    ];
  }

  ngOnInit() {
    this.doRefresh();
  }

  doRefresh(condition?: DataReloadEvent) {
    if (condition) {
      this.currentCondition = condition;
    } else {
      condition = this.currentCondition;
    }

    this.meteringService.getMeteringDetailList(
      condition.pageNumber,
      condition.pageSize,
      condition.active,
      condition.sortOrder,
      this.meteringId).subscribe((result) => {
      this.meteringLogList = result.content;
      for (const meteringLogEntity of result.content) {
        if (meteringLogEntity.current) {
          this.currentMeteringLog = meteringLogEntity;
          break;
        }
      }
      this.list.refresh(result.totalElements, this.meteringLogList, this.columns, condition);
    });
  }

  getDetailPageType(): Type<TableDetailPage>  {
    return MeteringDetailLogComponent;
  }

}
