import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DOCUMENT} from "@angular/common";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {HandleError, HttpErrorHandler} from "./service/http-error-handler.service";
import {AppConst} from "./models/app-const";
import {AppScope} from "./models/app-scope";
import {User} from "./models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly handleError: HandleError;

  constructor(@Inject(DOCUMENT) private document: any,
              private http: HttpClient,
              private cookieService: CookieService,
              httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('AuthService')
  }

  login() {
    this.clearSession();
    this.document.location.replace(AppConst.LOGIN_URL);
  }

  getAuthToken() {
    return this.cookieService.get("token");
  }

  isLoggedIn() {
    return this.cookieService.get("token") !== '';
  }

  validateLogin(): Observable<{ devConsoleEnabled: boolean, result: string }> {
    return this.http.get<JSON>(AppConst.LOGIN_VALIDATION_URL)
      .pipe(catchError(this.handleError('validateLogin', JSON.parse('{}'))));
  }

  clearSession() {
    const cookie: {} =this.cookieService.getAll();
    Object.keys(cookie).forEach(cookieKey=>{
        this.cookieService.delete(cookieKey);
    })
    AppScope.setCurrentUser(new User())
  }

  logout() {
    return this.http.get<JSON>(AppConst.LOGOUT_URL)
      .pipe(catchError(this.handleError("logout",JSON.parse('{}'))));
  }
}
