import {HttpParams} from '@angular/common/http';
import {Injectable, Optional} from '@angular/core';
import {LoginService, MessageService} from '@serengeti/serengeti-common';
import {Observable} from 'rxjs';
import {Configurations} from '../../../Configuration';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  public endPoint;

  constructor(
    private loginService: LoginService,
    private messageService: MessageService,
    private datePipe: DatePipe,
    @Optional() config: Configurations) {
    this.endPoint = Configurations.getServiceMeteringEndPoint(config) + '/metering/statistics';
  }

  dateFormat(date): string {
    return this.datePipe.transform(date, 'yyyyMMdd hh:mm:ss');
  }

  currentStatistics() {
    const url = this.endPoint + '/';
    return this.messageService.post(url);
  }

  allCloudStatistics(startDate, endDate): Observable<any> {
    const url = this.endPoint + '/all';

    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.messageService.query(url, params);
  }

  getMeteringStatistics(cloudId, startDate, endDate) {
    const url = this.endPoint + '/';

    const param = new HttpParams()
      .set('cloudId', cloudId)
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.messageService.query(url, param);

  }

  oneCloudStatistics(cloudId, startDate, endDate) {
    const url = this.endPoint + '/reload';

    const params = new HttpParams()
      .set('cloudId', cloudId)
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.messageService.query(url, params);

  }

  searchStatisticsDetail(page, size, sortItem, sortOrder, cloudId, currentDate, day) {
    const url = this.endPoint + '/metering/';

    const param = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortItem', sortItem)
      .set('sortOrder', sortOrder)
      .set('cloudId', cloudId)
      .set('currentDate', currentDate)
      .set('day', day);
    return this.messageService.query(url, param);
  }

  searchSummary(startDate, endDate): Observable<any> {
    const url = this.endPoint + '/summary';
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.messageService.query(url, params);
  }
}
