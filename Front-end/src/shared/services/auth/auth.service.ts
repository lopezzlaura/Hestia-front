import {HTTP_METHOD} from '../rest/constants';
import {Injectable} from '@angular/core';
import {RestService} from "../rest/rest.service";
import {InhabitantModel} from "../../models/InhabitantModel";

@Injectable()
export class AuthService {

    constructor(private rest: RestService) {
    }

    login(email: string, password: string): Promise<Object> {
        return new Promise((resolve, reject) => {
            this.rest.request(HTTP_METHOD.POST, "Members/login", {
                email: email,
                password: password
            }).then(res => {
                AuthService.setSession(res);
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    registration(firstname: string, lastname: string, email: string, password: string): Promise<Object> {
        return this.rest.request(HTTP_METHOD.POST, "Members", {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        });
    }

    private static setSession(authResult): void {
        localStorage.setItem('id_token', authResult.id);
    }

    public static getToken(): string {
        return localStorage.getItem('id_token');
    }

    public logout(): Promise<Object> {
        return new Promise(((resolve, reject) => {
            this.rest.request(HTTP_METHOD.POST, "Members/logout")
                .then(res => {
                    localStorage.removeItem('id_token');
                    resolve();
                }).catch(err => {
                reject(err);
            });
        }));
    }

    public static isLoggedIn(): boolean {
        return localStorage.getItem('id_token') != null;
    }

    public static isLoggedOut(): boolean {
        return !AuthService.isLoggedIn();
    }

    public changePassword(oldPass: string, newPass: string): Promise<Object> {
        return new Promise(((resolve, reject) => {
            this.rest.request(HTTP_METHOD.POST, "Members/change-password", {
                oldPassword: oldPass,
                newPassword: newPass
            })
                .then(res => {
                    resolve();
                }).catch(err => {
                reject(err);
            });
        }));
    }

    public updateUserCity(member: InhabitantModel, newCity: string, pass: string): Promise<Object> {
        console.log(member.id);

        return this.rest.request(HTTP_METHOD.PUT, "Members", {
            firstname: member.firstname,
            lastname: member.lastname,
            email: member.email,
            password: pass,
            id: member.id,
            realm: member.realm,
            emailVerified: member.emailVerified,
            username: member.username,
            city: newCity

        });
    }
}
