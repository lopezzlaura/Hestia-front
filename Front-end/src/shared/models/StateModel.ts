/**
 * Class that models the state of an issue
 */

export class StateModel {

  public id: number;
  public name: string;
  public value: number;


  constructor(id: number, name: string, value: number) {
    this.id = id;
    this.name = name;
    this.value = value;
  }
}
