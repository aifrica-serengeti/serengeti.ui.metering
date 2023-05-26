import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {
  CheckboxComponent,
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

  page = 0;
  size = 20;
  sortItem = 'createdDate';
  sortOrder = 'desc';

  idColumn: TableColumn;
  columns: TableColumn[];
  @ViewChild('meteringCloudList', {static: true}) list: TableComponent;

  meteringList = [];

  constructor(
    private meteringService: MeteringService,
    private router: Router,
  ) {
    this.columns = [
      this.idColumn = new IdentifierTableColumn('id', '', false)
        .withHeaderCheck(true).withIgnoreSort(true)
        .withType(CheckboxComponent)
        .withStyles('id-check'),
      new TableColumn('cloudType', 'metering.list.cloud.type'),
      new TableColumn('cloudName', 'metering.list.cloud.name'),
      new TableColumn('meteringType', 'metering.list.metering.type'),
      new TableColumn('meteringName', 'metering.list.metering.name'),
    ];
  }

  ngOnInit() {
    this.doRefresh();
  }

  public doRefresh(event?) {
    if (event) {
      this.page = event.pageNumber;
      this.size = event.pageSize;
      this.sortOrder = event.sortOrder;
    } else {
      this.pageReset();
    }

    this.meteringService.getMeteringList(this.page, this.size, this.sortItem, this.sortOrder).subscribe((result) => {
      this.meteringList = result.content;
      this.list.refresh(result.totalElements, this.meteringList, this.columns, event);
    });
  }

  public pageReset() {
    this.page = 0;
    this.size = 20;
    this.sortOrder = 'desc';
    this.sortItem = 'requestedDate';
  }

  goDetail($event: any) {
    const metering = $event.element.getData();

    this.router.navigate(['/main', { outlets: { content: 'metering/detail/' + metering.meteringId }}]);
  }

}
