import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService) {
    this.logout();
  }

  ngOnInit() {
  }

  private logout() {
    this.authService.logout()
      .subscribe(response => {
        console.log(response);
        this.authService.clearSession();
      })
  }
}
