import {Injectable} from '@angular/core';
import {API_URL, HTTP_METHOD} from './rest/constants';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest/rest.service';
import {StateModel} from "../models/StateModel";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from "rxjs/Observable";


@Injectable()
export class StateService {

  constructor(private http: HttpClient, private rest: RestService) {
  }

  public getStates(): Observable<StateModel[]> {
    return this.http.get<StateModel[]>(API_URL+'States');
  }
  public getState(id: number): Observable<StateModel> {
    return this.http.get<StateModel>(API_URL+'States/'+id);
  }
}
