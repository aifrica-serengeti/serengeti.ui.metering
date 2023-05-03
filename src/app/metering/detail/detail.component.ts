import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ButtonTableColumn,
  CheckboxComponent,
  IdentifierTableColumn,
  LoginService,
  MultiTableColumn,
  TableColumn,
  TableComponent
} from '@serengeti/serengeti-common';
import {MeteringService} from '../metering.service';
import {PriceDialogComponent} from './price-dialog/price-dialog.component';

@Component({
  selector: 'lib-metering-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class MeteringDetailComponent implements OnInit {

  cloudId;
  meteringList;

  page = 0;
  size = 10;
  sortItem = 'createdDate';
  sortOrder = 'desc';

  columns: TableColumn[];
  @ViewChild('meteringList', {static: true}) list: TableComponent;

  userRole = 'Root';
  constructor(
    private router: ActivatedRoute,
    private meteringService: MeteringService,
    private loginService: LoginService,
    private dialog: MatDialog,
  ) {
    this.router.paramMap.subscribe((params) => {
      this.cloudId = params.get('id');
    });
    this.columns = [
      new TableColumn('meteringName', 'metering.detail.table.title.name'),
      new TableColumn('meteringType', 'metering.detail.table.title.type'),
      new TableColumn('size', 'metering.detail.table.title.size'),
      new TableColumn('status', 'metering.detail.table.title.status'),
      new MultiTableColumn([
        new ButtonTableColumn('metering.detail.table.title.price', 'Control', 'warn')
        .withIcon('edit')
        .withChecker((element: any) => {
          return this.userRootCheck(element);
        })
      ], 'metering.detail.table.title.price')
      .withIgnoreSort(true)
      .withStyles('cellCenter')
    ];
  }

  ngOnInit() {
    this.doRefresh();
    if (this.loginService.hasRole('Root')) {
      this.userRole = 'Root';
    }
  }

  public doRefresh() {
    this.meteringService.getMeteringList(this.cloudId, this.page, this.size, this.sortItem, this.sortOrder).subscribe((result) => {
      this.meteringList = result.content;
      this.list.refresh(result.totalElements, this.meteringList, this.columns);
    });
  }

  private userRootCheck(element: any) {
    console.log(element);
    console.log(this.loginService.getLoginId());
    return this.loginService.hasRole('Root');
  }

  onPriceModal($event) {
    console.log($event.element.element);
    const metering = $event.element.element;

    const dialogRef = this.dialog.open(PriceDialogComponent, {
      width: '1024px',
      height: '700px',
      data: metering
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
