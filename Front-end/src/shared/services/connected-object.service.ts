import {HttpClient} from "@angular/common/http";
import {RestService} from "./rest/rest.service";
import {ConnectedObjectModel} from "../models/ConnectedObjectModel";
import {API_URL} from "./rest/constants";


export class ConnectedObjectService {
    constructor(private http: HttpClient, private rest: RestService) {
    }

    public postRequest(on: boolean, area: string, object: string): void {
        let request = {
            value: on,
            zone: area,
            object: object,
        };
        this.http.post<ConnectedObjectModel>(API_URL + "connectedObjects/", request);
    }
}