/**
 * Class that models the connected objects of the house
 */

export class ConnectedObjectRequestModel {

    public id: number;
    public title: string;
    public description: string;
    public emergencyId: number;
    public actionType: string;
    public date: string;
    public heure: string;
    public areaId: number;
    public connectedObjectId: number;
    public zoneId: string;

    constructor(title: string, description: string, emergencyId: number, actionType: string, connectedObjectId: number, areaId: number, zoneId: string, date: string, heure: string, id?: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.emergencyId = emergencyId;
        this.actionType = actionType;
        this.areaId = areaId;
        this.connectedObjectId = connectedObjectId;
        this.zoneId = zoneId;
        this.date = date;
        this.heure = heure;
    }
}
