export class HolidayModel {

    public id: number;
    public temperature: number;
    public isActivated: boolean;
    public areDectectorsOn: boolean;
    public areLightsRandom: boolean;

    constructor(id: number, temperature: number, isActivated: boolean, areDectectorsOn: boolean, areLightsRandom: boolean) {
        this.id = id;
        this.temperature = temperature;
        this.isActivated = isActivated;
        this.areDectectorsOn = areDectectorsOn;
        this.areLightsRandom = areLightsRandom;
    }
}
