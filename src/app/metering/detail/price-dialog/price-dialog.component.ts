import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MeteringService} from '../../metering.service';

@Component({
  selector: 'lib-metering-price-dialog',
  templateUrl: './price-dialog.component.html',
  styleUrls: ['./price-dialog.component.scss']
})
export class PriceDialogComponent implements OnInit {

  constructor(
    private meteringService: MeteringService,
    private dialogRef: MatDialogRef<PriceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private metering: any
  ) { }

  ngOnInit() {
    console.log(this.metering);
    this.meteringService.getMeteringPrice(this.metering.meteringId).subscribe((result) => {
      console.log(result);
    })

  }

  close() {
    this.dialogRef.close(this.metering);
  }
}
