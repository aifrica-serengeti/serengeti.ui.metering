import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MeteringService} from '../metering.service';

@Component({
  selector: 'lib-metering-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class MeteringDetailComponent implements OnInit {

  metering;
  meteringLog;

  constructor(
    private meteringService: MeteringService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log(this.data);
    this.metering = this.data;
    this.doRefresh();
  }

  public doRefresh() {
    this.meteringService.getMeteringLog(this.metering.meteringId).subscribe((result) => {
      this.meteringLog = result;
    });
  }
}
