import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AsyncSubject, Observable, Subject} from 'rxjs';
import {AuthService} from "./auth.service";
import {AlertService} from "./service/alert.service";
import {User} from "./models/user";
import {AppScope} from "./models/app-scope";
import {UserService} from "./service/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  currentUser: User;

  constructor(private _auth: AuthService,
              private _router: Router,
              private alertService: AlertService,
              private userService: UserService
  ) {
    this.subscribeCurrentUser();
  }

  private subscribeCurrentUser() {
    AppScope.currentUser.subscribe((user: User) => this.currentUser = user);
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    return this.fetchLoggedInUserDetails(state).toPromise();
  }

  private fetchLoggedInUserDetails(state: RouterStateSnapshot): Observable<boolean> {
    const observable: Subject<boolean> = new AsyncSubject<boolean>();
    this.validateLogin(observable, state);
    return observable;
  }

  validateLogin(observable: Subject<boolean>, state: RouterStateSnapshot) {
    return this._auth.validateLogin().subscribe((response: { result: string }) => {
      if (response.result === 'VALID') {
        const currentUser: User = this.currentUser;
        if (!currentUser || !currentUser.email) {
          this.findUser(currentUser, observable)
        } else {
          observable.next(true);
          observable.complete();
        }
      } else {
        observable.next(false);
        observable.complete();
        this._auth.login();
      }
    });
  }

  private findUser(currentUser: User, observable: Subject<boolean>) {
    this.userService.findUser().subscribe((userResponse: User) => {
      currentUser = userResponse;
      AppScope.setCurrentUser(currentUser);
      observable.next(true);
      observable.complete();
      AppScope.currentUser.subscribe(user => this.alertService.log(user.email ));
    });
  }
}
