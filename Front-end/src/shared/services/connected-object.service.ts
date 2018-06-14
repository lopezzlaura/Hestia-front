import {HttpClient} from "@angular/common/http";
import {RestService} from "./rest/rest.service";
import {API_URL} from "./rest/constants";
import {ConnectedObjectModel} from "../models/ConnectedObjectModel";
import {Observable} from "rxjs/Observable";


export class ConnectedObjectService {}
   /* constructor(private http: HttpClient) {
    }

    public getConnectedObjects(): Observable<ConnectedObjectModel[]> {
        return this.http.get<ConnectedObjectModel[]>(API_URL + 'ConnectedObjects');
    }

    public getConnectedObject(id: number): Observable<ConnectedObjectModel> {
        return this.http.get<ConnectedObjectModel>(API_URL + 'ConnectedObjects/' + id);
    }

    public postRequest(on: boolean, area: string, object: string): void {
        let request = {
            value: on,
            zone: area,
            object: object,
        };
        this.http.post<ConnectedObjectModel>(API_URL + "ConnectedObjects/", request);
    }
}*/