/**
 * Class that does some stuff
 */
export class ConnectedObjectModel {
    public id: number;
    public zone: string;
    public value: boolean;
    public object: string;

    constructor(area: string, on: boolean, object:string) {
        this.zone = area;
        this.value = on;
        this.object = object;
    }
}