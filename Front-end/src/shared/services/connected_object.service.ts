import {Injectable} from '@angular/core';
import {API_URL} from './rest/constants';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest/rest.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {ConnectedObjectModel} from '../models/ConnectedObjectModelForRequest';


@Injectable()
export class ConnectedObjectService {

    constructor(private http: HttpClient, private rest: RestService) {
    }

    public getConnectedObjects(): Observable<ConnectedObjectModel[]> {
        return this.http.get<ConnectedObjectModel[]>(API_URL + 'connectedObjects');
    }

    public getConnectedObject(id: number): Observable<ConnectedObjectModel> {
        return this.http.get<ConnectedObjectModel>(API_URL + 'connectedObjects/' + id);
    }
}
