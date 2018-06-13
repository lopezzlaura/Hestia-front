/**
 * Class that models the connected objects of the house
 */

export class ConnectedObjectModel {

    public id: number;
    public name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
