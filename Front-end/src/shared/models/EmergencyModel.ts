/**
 * Class that models an state of an issue
 */

export class EmergencyModel {

  public id: number;
  public name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
