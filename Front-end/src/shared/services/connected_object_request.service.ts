import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest/rest.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {API_URL} from "./rest/constants";
import {AreaService} from "./area.service";
import {ConnectedObjectService} from "./connected_object.service";
import {forkJoin} from "rxjs/observable/forkJoin";
import {MqttClient} from "ngx-mqtt/src/mqtt-types";
import {Observable} from 'rxjs/Observable';
import {ConnectedObjectRequestModel} from "../models/ConnectedObjectRequestModel";
import {InhabitantService} from "./inhabitant.service";
import {EmergencyService} from "./emergency.service";


@Injectable()
export class ConnectedObjectRequestService {

    private client: MqttClient;
    private issueList$: Observable<ConnectedObjectRequestModel[]>;


    constructor(private http: HttpClient, private rest: RestService, private emergencyService: EmergencyService, private inhabitantService: InhabitantService, private areaService: AreaService, private connectedObjectService: ConnectedObjectService) {
    }

    public getConnectedObjectRequests(): Observable<ConnectedObjectRequestModel[]> {
        this.issueList$ = this.http.get<ConnectedObjectRequestModel[]>(API_URL + "ConnectedObjectRequests");
        return this.http.get<ConnectedObjectRequestModel[]>(API_URL + 'ConnectedObjectRequests').map(models => models.map(model => {
            return new ConnectedObjectRequestModel(model.title, model.description, model.emergencyId, model.actionType, model.connectedObjectId, model.areaId, model.date, model.time, model.authorId, this.inhabitantService, this.connectedObjectService, this.emergencyService, this.areaService, model.id);
        }));
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

                console.log(areaValue.identifier);
                console.log(objectValue.name);
                let request = {
                    zone: areaValue.identifier,
                    object: objectValue.name,
                    value: formData.get("actionType").toString()
                };

                let mqtt = require('mqtt');
                let client = mqtt.connect("wb://localhost:8080");
                let topic = "";

                client.on('connect', function () {
                    if (request.object.match("Garage_Door")) {
                        topic = '/home/' + request.zone + '/Output/bool/' + request.object + "_(Close)";
                        client.publish("/hestia/request", topic + ";" + (formData.get("actionType").toString() == "True" ? "False" : "True") + ";" + formData.get("date-milli").toString());
                        topic = '/home/' + request.zone + '/Output/bool/' + request.object + "_(Open)";
                        client.publish("/hestia/request", topic + ";" + formData.get("actionType").toString() + ";" + formData.get("date-milli").toString());
                    } else if (request.object.match("Roller_Shades")) {
                        topic = '/home/' + request.zone + '/Output/bool/' + request.object + "_(Down)";
                        client.publish("/hestia/request", topic + ";" + (formData.get("actionType").toString() == "True" ? "False" : "True") + ";" + formData.get("date-milli").toString());
                        topic = '/home/' + request.zone + '/Output/bool/' + request.object + "_(Up)";
                        client.publish("/hestia/request", topic + ";" + formData.get("actionType").toString() + ";" + formData.get("date-milli").toString());
                    } else {
                        topic = '/home/' + request.zone + '/Output/bool/' + request.object;
                        console.log(topic);
                        console.log("data milli : " + formData.get("date-milli"));
                        client.publish("/hestia/request", topic + ";" + formData.get("actionType").toString() + ";" + formData.get("date-milli").toString());
                    }
                    client.end()
                });
            });
        })
    }
}
