import {Location} from '@angular/common';
import {Component, OnInit, Type, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TableColumn, TableComponent, TableDetailPage} from '@serengeti/serengeti-common';
import {MeteringDetailLogComponent} from '../detail-log/detail-log.component';
import {MeteringService} from '../service/metering.service';

@Component({
  selector: 'lib-metering-detail-list',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class MeteringDetailListComponent implements OnInit {

  page = 0;
  size = 10;
  sortItem = 'requestDate';
  sortOrder = 'desc';

  metering = {
    cloudType: '',
    cloudName: '',
    meteringName: '',
    meteringType: '',
    status: ''
  };
  meteringLogList;
  meteringId;
  currentMeteringLog;

  columns;
  @ViewChild('meteringLogList', {static: true}) list: TableComponent;

  constructor(
    private meteringService: MeteringService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.columns = [
      new TableColumn('requestActionType', 'metering.list.metering.active'),
      new TableColumn('cpu', 'metering.list.metering.cpu'),
      new TableColumn('gpu', 'metering.list.metering.gpu'),
      new TableColumn('memory', 'metering.list.metering.memory'),
      new TableColumn('disk', 'metering.list.metering.disk'),
      new TableColumn('updatedDate', 'metering.list.metering.request-date'),
    ];

  }

  ngOnInit() {
    this.meteringId = this.route.snapshot.params.id;

    this.meteringSearch();
    this.doRefresh();

  }

  public meteringSearch() {
    this.meteringService.selectMetering(this.meteringId).subscribe((result) => {
      this.metering = result;
    });
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
      for (const meteringLog of this.meteringLogList) {
        if (meteringLog.current) {
          this.currentMeteringLog = meteringLog;
          break;
        }
      }
      this.list.refresh(result.totalElements, this.meteringLogList, this.columns, event);
    });
  }

  public pageReset() {
    this.page = 0;
    this.size = 20;
    this.sortOrder = 'desc';
    this.sortItem = 'requestedDate';
  }

  public goBack() {
    this.location.back();
  }

  getDetailPageType(): Type<TableDetailPage>  {
    return MeteringDetailLogComponent;
  }
}
