/**
 * Class that models the connected objects of the house
 */
import {ConnectedObjectModel} from "./ConnectedObjectModel";
import {AreaModel} from "./AreaModel";
import {AreaService} from "../services/area.service";
import {ConnectedObjectService} from "../services/connected_object.service";
import {forkJoin} from "rxjs/observable/forkJoin";
import {EmergencyModel} from "./EmergencyModel";
import {InhabitantService} from "../services/inhabitant.service";
import {EmergencyService} from "../services/emergency.service";
import {InhabitantModel} from "./InhabitantModel";
import {StateService} from "../services/state.service";
import {StateModel} from "./StateModel";

export class ConnectedObjectRequestModel {

    public id: number;
    public title: string;
    public emergencyId: number;
    public actionType: string;
    public date: string;
    public time: string;
    public areaId: number;
    public author: InhabitantModel;
    public emergency: EmergencyModel;
    public area: AreaModel;
    public connectedObjectId: number;
    public connectedObject: ConnectedObjectModel;
    public authorId: number;
    public stateId: number;
    public state: StateModel;

    constructor(title: string, emergencyId: number, actionType: string, connectedObjectId: number, areaId: number, date: string, time: string, authorId: number, stateId: number, private inhabitantService: InhabitantService, private connectedObjectService: ConnectedObjectService,
                private emergencyService: EmergencyService, private areaService: AreaService, private stateService: StateService, id?: number) {
        const emergencyRequest = this.emergencyService.getEmergency(emergencyId);
        const connectedObjectRequest = this.connectedObjectService.getConnectedObject(connectedObjectId);
        const areaRequest = this.areaService.getArea(areaId);
        const authorRequest = this.inhabitantService.getMember(authorId);
        const stateRequest = this.stateService.getState(stateId);

        forkJoin(emergencyRequest, connectedObjectRequest, areaRequest, authorRequest, stateRequest).subscribe(([emergencyValue, connectedObjectValue, areaValue, authorValue, stateValue]) => {
            this.id = id;
            this.title = title;
            this.connectedObjectId = connectedObjectId;
            this.date = date;
            this.time = time;
            this.actionType = actionType;
            this.emergencyId = emergencyId;
            this.date = date;
            this.author = authorValue;
            this.stateId = stateId;
            this.emergency = emergencyValue;
            this.connectedObject = connectedObjectValue;
            this.area = areaValue;
            this.state = stateValue;
        });
    }
}
