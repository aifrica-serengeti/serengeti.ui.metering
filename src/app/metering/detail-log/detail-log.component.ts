import {Component, Input, OnInit} from '@angular/core';
import {TableColumn, TableComponent, TableDetailPage, TableElement} from '@serengeti/serengeti-common';
import {MeteringService} from '../service/metering.service';

@Component({
  selector: 'lib-metering-detail-log',
  templateUrl: './detail-log.component.html',
  styleUrls: ['./detail-log.component.scss']
})
export class MeteringDetailLogComponent implements OnInit, TableDetailPage {

  meteringLogJsonData;

  @Input() jsonData;

  constructor(
    private meteringService: MeteringService) {
  }

  ngOnInit() {
  }

  private doRefresh(logId) {
    this.meteringService.getMeteringLogData(logId).subscribe((result) => {
      const data = result.meteringJsonData;
      data.replace(/\\"/g, '"');
      this.meteringLogJsonData = JSON.parse(data);
    });
  }

  setContent(table: TableComponent, element: TableElement, columns: TableColumn[]): void {
    this.doRefresh(element.getData().id);
  }
}
