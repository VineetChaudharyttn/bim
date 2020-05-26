import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../auth.service";
import {User} from "../../../models/user";
import {AppScope} from "../../../models/app-scope";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;
  @Output() toggleSideNavBar: EventEmitter<any> = new EventEmitter();

  constructor(private authService: AuthService) {
    AppScope.currentUser.subscribe(user => this.user = user);
  }

  ngOnInit() {
  }

  toggleSideBar() {
    this.toggleSideNavBar.emit();
  }
}
