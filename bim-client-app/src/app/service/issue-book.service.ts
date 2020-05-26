import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Book} from "../models/book";
import {AppConst} from "../models/app-const";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class IssueBookService {

  constructor(private httpClient: HttpClient) { }

  getIssuedBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(AppConst.ISSUED_BOOK_URL).pipe(
      map(data => data), catchError(err => throwError(err.message))
    );
  }

  getAvailableBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(AppConst.AVAILABLE_BOOK_URL).pipe(
      map(data => data), catchError(err => throwError(err.message))
    );
  }
}
