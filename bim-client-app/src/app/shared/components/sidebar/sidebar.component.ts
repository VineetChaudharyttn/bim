import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {AppScope} from "../../../models/app-scope";
import {AuthService} from "../../../auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user: User;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    AppScope.currentUser.subscribe(user => this.user = user)
  }

}
