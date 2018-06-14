import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest/rest.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {API_URL} from "./rest/constants";
import {AreaService} from "./area.service";
import {ConnectedObjectService} from "./connected_object.service";
import {forkJoin} from "rxjs/observable/forkJoin";
import {MqttService} from "angular2-mqtt";
import {Observable} from 'rxjs/Observable';
import {ConnectedObjectRequestModel} from "../models/ConnectedObjectRequestModel";


@Injectable()
export class ConnectedObjectRequestService {

    constructor(private http: HttpClient, private _mqttService: MqttService, private rest: RestService, private areaService: AreaService, private connectedObjectService: ConnectedObjectService) {
    }

    public getConnectedObjectRequests(): Observable<ConnectedObjectRequestModel[]> {
        return this.http.get<ConnectedObjectRequestModel[]>(API_URL + 'ConnectedObjectRequests');
    }

    public getConnectedObjectRequest(id: number): Observable<ConnectedObjectRequestModel> {
        return this.http.get<ConnectedObjectRequestModel>(API_URL + 'ConnectedObjectRequests/' + id);
    }


    public postConnectedObjectIssue(formData: FormData) {

        let issue = {
            title: formData.get("title"),
            description: formData.get("description"),
            emergencyId: formData.get("idEmergency"),
            actionType: formData.get("actionType"),
            areaId: formData.get("zoneId"),
            connectedObjectId: formData.get("object"),
            date: formData.get("date"),
            time: formData.get("time")
        };

        this.http.post<ConnectedObjectRequestModel>(API_URL + 'ConnectedObjectRequests', issue).subscribe(object => {

            const areaRequest = this.areaService.getArea(object.areaId);
            const objectRequest = this.connectedObjectService.getConnectedObject(object.connectedObjectId);

            forkJoin(areaRequest, objectRequest).subscribe(([areaValue, objectValue]) => {
                let bool = formData.get("actionType") == "True";

                console.log(areaValue.identifier);
                console.log(objectValue.name);
                console.log(bool);
                let request = {
                    zone: areaValue.identifier,
                    object: objectValue.name,
                    value: bool
                };
                this._mqttService.unsafePublish("/home/" + request.zone + "/Outout/bool/" + request.object, request.value, {
                    qos: 1,
                    retain: true
                });
                // this.http.post(NODE_RED_API_URL + "ConnectedObject", request).subscribe(post => console.log(post));
            });
        })
    }
}
