import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RemoteDataService {
  private remoteUrl = 'http://coherent-research.co.uk/downloads/meters.json';

  constructor(private http: Http) { }

  getData(): Observable<any> {
    return this.http
      .get(this.remoteUrl)
      .map(res => res.json());
  }
}
