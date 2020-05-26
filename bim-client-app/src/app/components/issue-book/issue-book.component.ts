import { Component, OnInit } from '@angular/core';
import {Book} from "../../models/book";
import {IssueBookService} from "../../service/issue-book.service";

@Component({
  selector: 'app-issue-book',
  templateUrl: './issue-book.component.html',
  styleUrls: ['./issue-book.component.css']
})
export class IssueBookComponent implements OnInit {

  public books: Book[] =[];
  columnDefs = [
    {headerName: "Title",field:"bookName",sortable:true,filter: 'agTextColumnFilter'},
    {headerName: "Author Name",field:"authorName"},
    {headerName: "Publication", field:"publication"},
    {headerName: "Edition",field:"edition"},
    {headerName: "No of copies",field:"noOfCopies"}
  ];
  constructor( private issueBookService: IssueBookService) {
    this.issueBookService.getIssuedBooks().subscribe(books => this.books = books);
  }

  ngOnInit() {
  }

}
