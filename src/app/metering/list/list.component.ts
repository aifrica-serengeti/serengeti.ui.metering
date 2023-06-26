import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {
  CheckboxComponent, DataReloadEvent,
  IdentifierTableColumn,
  TableColumn,
  TableComponent
} from '@serengeti/serengeti-common';
import {MeteringService} from '../service/metering.service';

@Component({
  selector: 'lib-metering-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class MeteringListComponent implements OnInit {

  currentCondition: DataReloadEvent;

  idColumn: TableColumn;
  columns: TableColumn[];
  @ViewChild('meteringCloudList', {static: true}) list: TableComponent;

  meteringList = [];

  cloudList;
  selectCloud = null;

  constructor(
    private meteringService: MeteringService,
    private router: Router,
  ) {
    this.currentCondition = new DataReloadEvent('updatedDate', 'asc', 0, 10);
    this.columns = [
      this.idColumn = new IdentifierTableColumn('id', '', false)
        .withHeaderCheck(true).withIgnoreSort(true)
        .withType(CheckboxComponent)
        .withStyles('id-check'),
      new TableColumn('cloudType', 'metering.list.cloud.type'),
      new TableColumn('cloudName', 'metering.list.cloud.name'),
      new TableColumn('meteringType', 'metering.list.metering.type'),
      new TableColumn('status', 'metering.list.metering.status'),
      new TableColumn('meteringName', 'metering.list.metering.name'),
    ];
  }

  ngOnInit() {
    this.doRefresh();
    this.searchCloud();
  }

  doRefresh(condition?: DataReloadEvent) {
    if (condition) {
      this.currentCondition = condition;
    } else {
      condition = this.currentCondition;
    }

    this.meteringService.getMeteringList(
      condition.pageNumber,
      condition.pageSize,
      condition.active,
      condition.sortOrder,
      this.selectCloud).subscribe((result) => {
      this.meteringList = result.content;
      this.list.refresh(result.totalElements, this.meteringList, this.columns, condition);
    });
  }

  goDetail($event: any) {
    const metering = $event.element.getData();

    this.router.navigate(['/main', {outlets: {content: 'metering/detail/' + metering.meteringId}}]);
  }

  searchCloud() {
    this.meteringService.searchCloud().subscribe((result) => {
      this.cloudList = result;
    });
  }

}
