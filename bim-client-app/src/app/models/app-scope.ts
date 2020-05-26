import {BehaviorSubject, Observable} from "rxjs";
import {User} from "./user";

export class AppScope {

  private static _$currentUser = new BehaviorSubject<User>(new User());

  static get currentUser(): Observable<User> {
    return this._$currentUser.asObservable();
  }

  static setCurrentUser(value: User){
    this._$currentUser.next(value);
  }
}
