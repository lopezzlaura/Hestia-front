import {Injectable} from '@angular/core';
import {API_URL, HTTP_METHOD} from './rest/constants';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest/rest.service';
import {IssueModel} from "../models/IssueModel";
import {Observable} from "rxjs/Observable";
import {TypeModel} from "../models/TypeModel";
import {StateModel} from "../models/StateModel";


@Injectable()
export class TypeService {

  constructor(private http: HttpClient, private rest: RestService) {
  }

  public getTypes():Observable<TypeModel[]> {
    return this.http.get<TypeModel[]>(API_URL+'Types');
  }
  public getType(id: number): Observable<TypeModel> {
    return this.http.get<TypeModel>(API_URL+'Types/'+id);
  }
}
