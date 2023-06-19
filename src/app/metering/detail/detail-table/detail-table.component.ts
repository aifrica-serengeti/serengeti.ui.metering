import {Component, Input, OnInit, Type, ViewChild} from '@angular/core';
import {TableColumn, TableComponent, TableDetailPage} from '@serengeti/serengeti-common';
import {MeteringService} from '../../service/metering.service';
import {Statistics} from '../../statistics/Statistics';
import {MeteringDetailLogComponent} from '../detail-log/detail-log.component';

@Component({
  selector: 'lib-metering-detail-table',
  templateUrl: './detail-table.component.html',
  styleUrls: ['./detail-table.component.scss']
})
export class MeteringDetailTableComponent implements OnInit {

  page = 0;
  size = 10;
  sortItem = 'requestDate';
  sortOrder = 'asc';

  meteringLogList;
  currentMeteringLog;

  statistics: Statistics;

  columns;
  @ViewChild('meteringLogList', {static: true}) list: TableComponent;

  @Input() meteringId;
  @Input() metering;

  constructor(private meteringService: MeteringService) {

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

  public doRefresh(event?: any) {
    if (event) {
      this.page = event.pageNumber;
      this.size = event.pageSize;
      this.sortOrder = event.sortOrder;
      this.sortItem = event.active;
    } else {
      this.pageReset();
    }

    this.meteringService.getMeteringDetailList(this.page, this.size, this.sortItem, this.sortOrder, this.meteringId).subscribe((result) => {
      this.meteringLogList = result.content;
      for (const meteringLogEntity of result.content) {
        if (meteringLogEntity.current) {
          this.currentMeteringLog = meteringLogEntity;
          break;
        }
      }
      this.list.refresh(result.totalElements, this.meteringLogList, this.columns, event);
    });
  }

  getDetailPageType(): Type<TableDetailPage>  {
    return MeteringDetailLogComponent;
  }

  public pageReset() {
    this.page = 0;
    this.size = 20;
    this.sortOrder = 'desc';
    this.sortItem = 'requestedDate';
  }
}
