/**
 * Class that models the type of an issue
 */

export class TypeModel {

  public id: number;
  public name: string;
  public value: number;


  constructor(id: number, name: string, value: number) {
    this.id = id;
    this.name = name;
    this.value = value;
  }
}
