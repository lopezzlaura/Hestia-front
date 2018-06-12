import {CanActivate, CanActivateChild} from "@angular/router";
import {AuthService} from "../../shared/services/auth/auth.service";

export class AuthGuard implements CanActivate, CanActivateChild {
  canActivateChild() {
    return this.canActivate();
  }

  canActivate() {
    return AuthService.isLoggedIn();
  }
}
