import {NgModule} from '@angular/core';
import {MatButtonModule, MatButtonToggleModule, MatDividerModule, MatIconModule, MatListModule, MatMenuModule, MatToolbarModule} from "@angular/material";


const MaterialComponents = [
  MatButtonModule,
  MatButtonToggleModule,
  MatToolbarModule,
  MatIconModule,
  MatDividerModule,
  MatMenuModule,
  MatListModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule {
}
