export class HolidayModel {

    public id: number;
    public temperature: number;
    public isActivated: boolean;

    constructor(id: number, temperature: number, isActivated: boolean) {
        this.id = id;
        this.temperature = temperature;
        this.isActivated = isActivated
    }
}
