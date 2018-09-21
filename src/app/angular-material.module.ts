import { NgModule } from "@angular/core";
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatSelectModule
} from "@angular/material";

@NgModule({

 exports: [
  MatInputModule,
  MatDialogModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatSelectModule
 ]
})
export class AngularMaterialModule {

}
