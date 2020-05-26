import { Component, OnInit } from '@angular/core';
import {Book} from "../../models/book";
import {BookService} from "../../service/book.service";
import {HandleError, HttpErrorHandler} from "../../service/http-error-handler.service";

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit {

  public books: Book[] =[];
  columnDefs = [
    {headerName: "Title",field:"bookName",sortable:true,filter: 'agTextColumnFilter'},
    {headerName: "Author Name",field:"authorName"},
    {headerName: "Publication", field:"publication"},
    {headerName: "Edition",field:"edition"},
    {headerName: "No of copies",field:"noOfCopies"}
  ];
  private readonly handleError: HandleError;
  constructor( private bookService: BookService,
               private httpErrorHandler: HttpErrorHandler
               ) {
    this.handleError = httpErrorHandler.createHandleError("allBooks")
  }

  ngOnInit() {
    console.log("ag grid test");
    this.bookService.getBooks().subscribe(data => {this.books = data;});
  }

}
