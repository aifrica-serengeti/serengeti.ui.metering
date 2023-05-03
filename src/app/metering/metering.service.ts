import {HttpParams} from '@angular/common/http';
import {Injectable, Optional} from '@angular/core';
import {LoginService, MessageService} from '@serengeti/serengeti-common';
import {Observable} from 'rxjs';
import {Configurations} from '../../Configuration';

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
      this.endPoint += '/';
    }
  }
  public getMeteringCloudList(): Observable<any> {
    const url = this.endPoint + 'cloud';

    const param = new HttpParams()
      .set('page', '0')
      .set('size', '10')
      .set('sortItem', 'createdDate')
      .set('sortOrder', 'asc');
    return this.messageService.query(url, param);
  }

  getMeteringList(cloudId, page, size, sortItem, sortOrder): Observable<any> {
    const url = this.endPoint;

    const param = new HttpParams()
      .set('cloudId', cloudId)
      .set('page', page)
      .set('size', size)
      .set('sortItem', sortItem)
      .set('sortOrder', sortOrder);

    return this.messageService.query(url, param);
  }

  getMeteringPrice(meteringId) {
    const url = this.endPoint + meteringId + '/price';

    return this.messageService.query(url);

  }
}
