import {HTTP_METHOD} from "../../shared/services/rest/constants";
import {RestService} from "../../shared/services/rest/rest.service";
import {Injectable} from "@angular/core";

@Injectable()
export class GuardHelper {

    constructor(private rest: RestService) {
    }

    public canActivateRole(roleName: string): Promise<boolean> {
        return new Promise<boolean>((resolve => {
            this.rest.request(HTTP_METHOD.GET, "Members/getRoles")
                .then(res => {
                    for (const key in res["roles"]) {
                        if (res["roles"].hasOwnProperty(key)) {
                            const value = res["roles"][key];
                            if (value == roleName) {
                                console.log(roleName + " can do this");
                                resolve(true);
                            }
                        }
                    }

                    resolve(false);
                }).catch(err => {
                resolve(false);
            });
        }));
    }
}
