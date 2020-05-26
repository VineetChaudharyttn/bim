import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {HandleError, HttpErrorHandler} from "./http-error-handler.service";
import {AppConst} from "../models/app-const";
import {catchError, map} from "rxjs/operators";
import {plainToClass} from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly handleError: HandleError;

  constructor(private httpClient: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError= httpErrorHandler.createHandleError("UserService")
  }

  findUser(): Observable<User> {
return this.httpClient.get<User>(AppConst.USER_DETAILS_URL)
  .pipe(map(resp=> plainToClass(User, resp['user'])))
  .pipe(catchError(this.handleError("findUser",new User())));
  }
}
