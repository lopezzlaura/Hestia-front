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
    public zoneType: string;
    public zoneId: string;

    constructor(title: string, description: string, emergencyId: number, actionType: string, zoneType: string, zoneId: string, date: string, heure: string, id?: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.emergencyId = emergencyId;
        this.actionType = actionType;
        this.zoneType = zoneType;
        this.zoneId = zoneId;
        this.date = date;
        this.heure = heure;
    }
}
