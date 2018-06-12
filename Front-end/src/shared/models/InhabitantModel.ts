/**
 * Class that models an inhabitant of a household
 */
export class InhabitantModel {

  public id: number;
  public lastname: string;
  public firstname: string;
  public username: string;
  public email: string;
  public emailVerified: boolean;
  public realm: string;
  public password: string;
  public city: string;

  constructor(id?: number, lastname?: string, firstname?: string, username?: string,
     email?: string, emailVerified?: boolean, realm?: string, password?: string, city?:string) {
    this.id = id;
    this.lastname = lastname;
    this.firstname = firstname;
    this.username = username;
    this.email = email;
    this.emailVerified = emailVerified;
    this.realm = realm;
    this.password = password;
    this.city = city;
  }



}
