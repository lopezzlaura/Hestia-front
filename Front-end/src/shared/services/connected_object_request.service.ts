import {Injectable} from '@angular/core';
import {API_URL} from './rest/constants';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest/rest.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {ConnectedObjectRequestModel} from "../models/ConnectedObjectRequestModel";


@Injectable()
export class ConnectedObjectRequestService {

    constructor(private http: HttpClient, private rest: RestService) {
    }

    public getConnectedObjectRequests(): Observable<ConnectedObjectRequestModel[]> {
        return this.http.get<ConnectedObjectRequestModel[]>(API_URL + 'ConnectedObjectRequests');
    }

    public getConnectedObjectRequest(id: number): Observable<ConnectedObjectRequestModel> {
        return this.http.get<ConnectedObjectRequestModel>(API_URL + 'ConnectedObjectRequests/' + id);
    }
}
