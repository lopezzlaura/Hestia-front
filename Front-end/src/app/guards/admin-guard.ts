import {CanActivate, CanActivateChild} from '@angular/router';
import {Injectable} from "@angular/core";
import {GuardHelper} from "./guard-helper";

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {

    constructor(private helper: GuardHelper) {
    }

    canActivateChild(): Promise<boolean> {
        return this.canActivate();
    }

    canActivate(): Promise<boolean> {
        return this.helper.canActivateRole("admin");
    }
}
