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

export class ConnectedObjectRequestModel {

    public id: number;
    public title: string;
    public description: string;
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

    constructor(title: string, description: string, emergencyId: number, actionType: string, connectedObjectId: number, areaId: number, date: string, time: string, authorId: number, inhabitantService: InhabitantService, connectedObjectService: ConnectedObjectService,
                emergencyService: EmergencyService, areaService: AreaService, id?: number) {
        const emergencyRequest = emergencyService.getEmergency(emergencyId);
        const connectedObjectRequest = connectedObjectService.getConnectedObject(connectedObjectId);
        const areaRequest = areaService.getArea(areaId);
        const authorRequest = inhabitantService.getMember(authorId);

        forkJoin(emergencyRequest, connectedObjectRequest, areaRequest, authorRequest).subscribe(([emergencyValue, connectedObjectValue, areaValue, authorValue]) => {
            this.id = id;
            this.title = title;
            this.connectedObjectId = connectedObjectId;
            this.date = date;
            this.time = time;
            this.actionType = actionType;
            this.description = description;
            this.emergencyId = emergencyId;
            this.date = date;
            this.author = authorValue;
            this.emergency = emergencyValue;
            this.connectedObject = connectedObjectValue;
            this.area = areaValue;
        });
    }
}
