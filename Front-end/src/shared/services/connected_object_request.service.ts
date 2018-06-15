import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest/rest.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {API_URL} from "./rest/constants";
import {AreaService} from "./area.service";
import {ConnectedObjectService} from "./connected_object.service";
import {forkJoin} from "rxjs/observable/forkJoin";
import {Observable} from 'rxjs/Observable';
import {ConnectedObjectRequestModel} from "../models/ConnectedObjectRequestModel";
import {InhabitantService} from "./inhabitant.service";
import {EmergencyService} from "./emergency.service";
import {StateService} from "./state.service";
import {IssueModel} from "../models/IssueModel";


@Injectable()
export class ConnectedObjectRequestService {

    private issueList$: Observable<ConnectedObjectRequestModel[]>;


    constructor(private http: HttpClient, private rest: RestService, private emergencyService: EmergencyService, private inhabitantService: InhabitantService, private areaService: AreaService, private connectedObjectService: ConnectedObjectService, private stateService:StateService) {
    }

    public getConnectedObjectRequests(): Observable<ConnectedObjectRequestModel[]> {
        this.issueList$ = this.http.get<ConnectedObjectRequestModel[]>(API_URL + "ConnectedObjectRequests");
        return this.http.get<ConnectedObjectRequestModel[]>(API_URL + 'ConnectedObjectRequests').map(models => models.map(model => {
            return new ConnectedObjectRequestModel(model.title, model.emergencyId, model.actionType, model.connectedObjectId, model.areaId, model.date, model.time, model.authorId, model.stateId, this.inhabitantService, this.connectedObjectService, this.emergencyService, this.areaService, this.stateService, model.id);
        }));
    }

    public getConnectedObjectRequest(id: number): Observable<ConnectedObjectRequestModel> {
        return this.http.get<ConnectedObjectRequestModel>(API_URL + 'ConnectedObjectRequests/' + id);
    }

    public updateObjectState(id: number, state: number): void {
        this.issueList$.subscribe(array => array.forEach(value => {
            if (value.id == id) {
                console.log("old state : " + value.stateId);
                console.log("new state : " + state);
                let issue = {
                    title: value.title,
                    date: value.date,
                    time: value.time,
                    id: value.id,
                    areaId : value.areaId,
                    authorId: value.authorId,
                    emergencyId: value.emergencyId,
                    stateId: state,
                    actionType : value.actionType,
                    connectedObjectId: value.connectedObjectId
                };
                this.http.put<ConnectedObjectRequestModel>(API_URL + 'ConnectedObjectRequests/' + id, issue).subscribe(data => {
                    console.log(data);
                });
            }
        }));
    }

    public postConnectedObjectIssue(formData: FormData) {

        let issue = {
            title: formData.get("title"),
            emergencyId: formData.get("idEmergency"),
            actionType: formData.get("actionType"),
            areaId: formData.get("zoneId"),
            stateId: 3,
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
/*
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
            });*/
        })
    });
}}
