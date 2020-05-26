import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthGuard} from "./auth.guard";
import {IssueBookComponent} from "./components/issue-book/issue-book.component";
import {ReternBookComponent} from "./components/retern-book/retern-book.component";
import {HistoryComponent} from "./components/history/history.component";
import {LogoutComponent} from "./components/logout/logout.component";



const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'home', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'issue-book', component: IssueBookComponent, canActivate: [AuthGuard]},
  {path: 'return-book', component: ReternBookComponent, canActivate: [AuthGuard]},
  {path: 'history', component: HistoryComponent, canActivate: [AuthGuard]},
  {path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false, onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [DashboardComponent];
