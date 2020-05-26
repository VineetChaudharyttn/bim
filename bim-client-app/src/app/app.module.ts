import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule, routingComponents} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {AuthGuard} from "./auth.guard";
import {InterceptorService} from "./interceptor.service";
import {CookieService} from "ngx-cookie-service";
import {AgGridModule} from 'ag-grid-angular';
import {ToastrModule} from "ngx-toastr";
import {AlertService} from "./service/alert.service";
import {HistoryComponent} from './components/history/history.component';
import {ReternBookComponent} from './components/retern-book/retern-book.component';
import {IssueBookComponent} from './components/issue-book/issue-book.component';
import {UserService} from "./service/user.service";
import {LogoutComponent} from './components/logout/logout.component';
import {SharedModule} from "./shared/shared.module";
import {MatSidenavModule} from "@angular/material";
import {AllBooksComponent} from './components/all-books/all-books.component';
import {AvailableBooksComponent} from './components/available-books/available-books.component';
import {IssuedBooksComponent} from './components/issued-books/issued-books.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HistoryComponent,
    ReternBookComponent,
    IssueBookComponent,
    LogoutComponent,
    AllBooksComponent,
    AvailableBooksComponent,
    IssuedBooksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    ToastrModule.forRoot(),
    SharedModule,
    MatSidenavModule
  ],
  providers: [AuthService, AuthGuard, CookieService, AlertService, UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
