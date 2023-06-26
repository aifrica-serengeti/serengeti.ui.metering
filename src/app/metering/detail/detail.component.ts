import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MeteringService} from '../service/metering.service';

@Component({
  selector: 'lib-metering-detail-list',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class MeteringDetailListComponent implements OnInit {

  metering = {
    cloudType: '',
    cloudName: '',
    meteringName: '',
    meteringType: '',
    status: ''
  };
  meteringId;

  constructor(
    private meteringService: MeteringService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.meteringId = this.route.snapshot.params.id;
    this.meteringSearch();
  }

  public meteringSearch() {
    this.meteringService.selectMetering(this.meteringId).subscribe((result) => {
      this.metering = result;
    });
  }

  public goBack() {
    this.location.back();
  }

}
