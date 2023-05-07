import { Component, OnInit } from '@angular/core';
import {MeteringService} from '../metering/metering.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  cloudList = [
    {
      id: '140de8b0-d6ed-487e-8500-878e01502595',
      name: 'serengerti-prod',
      type: 'Kubernetes'
    },
    {
      id: '974499de-a230-46be-ae02-03b36004b337',
      name: 'AIFRICA K8S 클라우드',
      type: 'Kubernetes'
    }
  ];

  constructor(
    private meteringService: MeteringService
  ) { }

  ngOnInit() {
  }

  detail(cloud) {
    this.meteringService.getMeteringStatistics(cloud.id).subscribe((result) => {
      console.log(result);
    });
  }
}
