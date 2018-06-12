import {Injectable} from '@angular/core';
import {API_URL} from './rest/constants';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest/rest.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {EmergencyModel} from '../models/EmergencyModel';


@Injectable()
export class EmergencyService {

  constructor(private http: HttpClient, private rest: RestService) {
  }

  public getEmergencies(): Observable<EmergencyModel[]> {
    return this.http.get<EmergencyModel[]>(API_URL + 'Emergencies');
  }

  public getEmergency(id: number): Observable<EmergencyModel> {
    return this.http.get<EmergencyModel>(API_URL + 'Emergencies/' + id);
  }
}
