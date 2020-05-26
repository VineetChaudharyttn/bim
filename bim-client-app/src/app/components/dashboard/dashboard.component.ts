import { Component, OnInit } from '@angular/core';
import {BookService} from "../../service/book.service";
import {Book} from "../../models/book";

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  selectedTable: string = 'all';
  public error ='';
  constructor(private bookService: BookService) { }

  ngOnInit() {
  }

}
