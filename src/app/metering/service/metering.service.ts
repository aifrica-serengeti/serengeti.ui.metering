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
  public getMeteringList(page, size, sortItem, sortOrder): Observable<any> {
    const url = this.endPoint;

    const param = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortItem', sortItem)
      .set('sortOrder', sortOrder);
    return this.messageService.query(url, param);
  }

  getMeteringCloudList(): Observable<any> {
    const url = this.endPoint + 'cloud';

    const param = new HttpParams()
      .set('page', '0')
      .set('size', '10')
      .set('sortItem', 'createdDate')
      .set('sortOrder', 'asc');
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
}
