import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Book} from "../models/book";
import {AppConst} from "../models/app-const";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private httpClient: HttpClient) { }

  getBooks(): Observable<Book[]> {
    console.log("Book service");
    return this.httpClient.get<Book[]>(AppConst.BOOK_URL).pipe(
      map(data =>data),catchError(err => throwError(err.message))
    );
  }
}
