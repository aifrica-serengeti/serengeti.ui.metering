import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {
  CheckboxComponent,
  IdentifierTableColumn,
  TableColumn,
  TableComponent
} from '@serengeti/serengeti-common';
import {MeteringService} from '../metering.service';

@Component({
  selector: 'lib-metering-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class MeteringListComponent implements OnInit {

  page = 0;
  size = 20;
  sortItem = 'requestDate';
  sortOrder = 'desc';

  idColumn: TableColumn;
  columns: TableColumn[];
  @ViewChild('meteringCloudList', {static: true}) list: TableComponent;

  meteringList = [];

  constructor(private meteringService: MeteringService, private router: Router) {
    this.columns = [
      this.idColumn = new IdentifierTableColumn('id', '', false)
        .withHeaderCheck(true).withIgnoreSort(true)
        .withType(CheckboxComponent)
        .withStyles('id-check'),
      new TableColumn('ownerId', 'metering.list.cloud.ownerId'),
      new TableColumn('cloudType', 'metering.list.cloud.type'),
      new TableColumn('cloudName', 'metering.list.cloud.name'),
      new TableColumn('meteringType', 'metering.list.metering.type'),
      new TableColumn('meteringName', 'metering.list.metering.name'),
      new TableColumn('requestDate', 'metering.list.metering.request-date')
    ]
  }

  ngOnInit() {
    this.doRefresh();
  }

  public doRefresh(event?) {
    console.log(event);

    if (event) {
      this.page = event.pageNumber;
      this.size = event.pageSize;
      this.sortOrder = event.sortOrder;
    }
    this.meteringService.getMeteringList(this.page, this.size, this.sortItem, this.sortOrder).subscribe((result) => {
      console.log(result);
      this.meteringList = result.content;
    //   for (const meteringContent of result.content) {
    //     const metering = {
    //       id: meteringContent.cloudId,
    //       cloudName: meteringContent.cloudName,
    //       cloudType: meteringContent.cloudType,
    //       cpu: 0,
    //       memory: 0,
    //       gpu: 0
    //     };
    //
    //     for (const meteringValue of meteringContent.meteringList) {
    //       console.log(meteringValue);
    //       if (meteringValue.status === 'Activate') {
    //         if (meteringValue.meteringType === 'Volume') {
    //           metering.memory += metering.memory + meteringValue.size;
    //         } else if (meteringValue.meteringType === 'Instance') {
    //           metering.cpu += metering.cpu + meteringValue.size;
    //         }
    //       }
    //     }
    //     this.meteringList.push(metering);
    //   }
      this.list.refresh(result.totalElements, this.meteringList, this.columns, event);
    });
  }

  goDetail($event: any) {
    const metering = $event.element.getData();
    console.log(metering);
    this.router.navigate(['/main', { outlets: { content: 'metering/detail/' + metering.meteringId}}]);
  }

}
