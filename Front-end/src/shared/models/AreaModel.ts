/**
 * Class that models an area of the house
 */

export class AreaModel {

    public id: number;
    public type: string;
    public name: string;

    constructor(id: number, type: string, name: string) {
        this.id = id;
        this.type = type;
        this.name = name;
    }
}
