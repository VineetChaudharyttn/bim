import {Component, Inject} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {AuthService} from "./auth.service";
import {User} from "./models/user";
import {AppScope} from "./models/app-scope";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  sideBar: boolean = true;
  constructor() {
  }

  sideBarToggle($event: any) {
    this.sideBar = !this.sideBar;
  }
}
