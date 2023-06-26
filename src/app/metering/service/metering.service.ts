import {HttpParams} from '@angular/common/http';
import {Injectable, Optional} from '@angular/core';
import {LoginService, MessageService} from '@serengeti/serengeti-common';
import {Observable} from 'rxjs';
import {Configurations} from '../../../Configuration';

@Injectable({
  providedIn: 'root'
})
export class MeteringService {

  public endPoint;

  constructor(
    private loginService: LoginService,
    private messageService: MessageService,
    @Optional() config: Configurations) {
    this.endPoint = Configurations.getServiceMeteringEndPoint(config);
    if (!this.endPoint.endsWith('/')) {
      this.endPoint += '/metering/';
    }
  }
  public getMeteringList(page, size, sortItem, sortOrder, selectCloud): Observable<any> {
    const url = this.endPoint;

    let cloudId = null;
    if (selectCloud) {
      cloudId = selectCloud.cloudId;
    }

    const param = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortItem', sortItem)
      .set('sortOrder', sortOrder)
      .set('cloudId', cloudId);
    return this.messageService.query(url, param);
  }

  getMeteringLogData(logId): Observable<any> {
    const url = this.endPoint + 'log/data';

    const param = new HttpParams()
      .set('logId', logId);
    return this.messageService.query(url, param);
  }

  getMeteringStatistics(cloudId, startDate, endDate) {
    const url = this.endPoint + 'statistics/';

    const param = new HttpParams()
      .set('cloudId', cloudId)
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.messageService.query(url, param);

  }

  searchCloud(): Observable<any> {
    const url = this.endPoint + 'cloud';
    return this.messageService.query(url);
  }

  getMeteringDetailList(page, size, sortItem, sortOrder, meteringId: any): Observable<any> {
    const url = this.endPoint + 'detail/list';

    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortItem', sortItem)
      .set('sortOrder', sortOrder)
      .set('meteringId', meteringId);
    return this.messageService.query(url, params);
  }

  selectMetering(meteringId): Observable<any> {
    const url = this.endPoint + 'detail';

    const params = new HttpParams()
      .set('meteringId', meteringId);
    return this.messageService.query(url, params);
  }

  currentStatistics() {
    const url = this.endPoint + 'statistics/';
    return this.messageService.post(url);
  }

  allCloudStatistics(startDate, endDate): Observable<any> {
    const url = this.endPoint + 'statistics/all';

    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.messageService.query(url, params);
  }

  oneCloudStatistics(cloudId, startDate, endDate) {
    const url = this.endPoint + 'statistics/reload';

    const params = new HttpParams()
      .set('cloudId', cloudId)
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.messageService.query(url, params);

  }

  searchStatisticsDetail(page, size, sortItem, sortOrder, cloudId, currentDate, day) {
    const url = this.endPoint + '/statistics/metering/';

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
}
