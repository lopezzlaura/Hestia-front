/**
 * Class that models an area of the house
 */

export class AreaModel {

    public id: number;
    public identifier: string;
    public name: string;

    constructor(id: number, identifier: string, name: string) {
        this.id = id;
        this.identifier = identifier;
        this.name = name;
    }
}
