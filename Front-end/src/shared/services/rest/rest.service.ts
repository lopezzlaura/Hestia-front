import {API_URL, HTTP_METHOD} from './constants';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class RestService {

  constructor(private http: HttpClient) {
  }

  request(method: HTTP_METHOD, route: string, params?: object): Promise<Object> {

    return new Promise((resolve, reject) => {
      const head = new HttpHeaders('Content-Type: application/json\nAccept: application/json');

      this.http.request(method.methodName, API_URL + route, {
        body: params,
        responseType: 'json',
        headers: head
      }).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }
}
