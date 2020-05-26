import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {AppRoutingModule} from "../app-routing.module";
import {AuthService} from "../auth.service";
import {MaterialModule} from "../material/material.module";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [AuthService],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ]
})
export class SharedModule {
}
