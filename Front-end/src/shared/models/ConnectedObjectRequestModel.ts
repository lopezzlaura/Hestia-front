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

export class ConnectedObjectRequestModel {

    public id: number;
    public title: string;
    public description: string;
    public emergencyId: number;
    public actionType: string;
    public date: string;
    public time: string;
    public areaId: number;
    public emergency: EmergencyModel;
    public area: AreaModel;
    public connectedObjectId: number;
    public connectedObject: ConnectedObjectModel;
    public authorId: number;

    constructor(title: string, description: string, emergencyId: number, actionType: string, connectedObjectId: number, areaId: number, zoneId: string, date: string, time: string, authorId: number, inhabitantService: InhabitantService, connectedObjectService: ConnectedObjectService,
                emergencyService: EmergencyService, areaService: AreaService, id?: number) {
        const emergencyRequest = emergencyService.getEmergency(emergencyId);
        const connectedObjectRequest = connectedObjectService.getConnectedObject(connectedObjectId);
        const areaRequest = areaService.getArea(areaId);

        forkJoin(emergencyRequest, connectedObjectRequest, areaRequest).subscribe(([emergencyValue, connectedObjectValue, areaValue]) => {
            this.id = id;
            this.title = title;
            this.connectedObjectId = connectedObjectId;
            this.date = date;
            this.time = time;
            this.actionType = actionType;
            this.description = description;
            this.emergencyId = emergencyId;
            this.date = date;
            this.emergency = emergencyValue;
            this.connectedObject = connectedObjectValue;
            this.area = areaValue;
        });
    }
}
