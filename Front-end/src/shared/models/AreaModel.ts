/**
 * Class that models an area of the house
 */

export class AreaModel {

    public id: number;
    public type: string;

    constructor(id: number, type: string) {
        this.id = id;
        this.type = type;
    }
}
