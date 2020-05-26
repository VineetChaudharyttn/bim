import { Component, OnInit } from '@angular/core';
import {Book} from "../../models/book";
import {IssueBookService} from "../../service/issue-book.service";

@Component({
  selector: 'app-available-books',
  templateUrl: './available-books.component.html',
  styleUrls: ['./available-books.component.css']
})
export class AvailableBooksComponent implements OnInit {

  public books: Book[] =[];

  columnDefs = [
    {headerName: "Title",field:"bookName",sortable:true,filter: 'agTextColumnFilter'},
    {headerName: "Author Name",field:"authorName"},
    {headerName: "Publication", field:"publication"},
    {headerName: "Edition",field:"edition"},
    {headerName: "No of copies",field:"noOfCopies"}
  ];
  constructor( private issueBookService: IssueBookService) {
    this.issueBookService.getAvailableBooks().subscribe(data => {this.books = data;});
  }

  ngOnInit() {
  }

}
