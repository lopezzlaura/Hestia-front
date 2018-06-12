import { Injectable } from '@angular/core';


@Injectable()
export class PasswordGenerator {


  constructor() {

  }

  public generate(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890';
    let pass = '';
    for (let x = 0; x < 8; x++) {
        const i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
  }
}
