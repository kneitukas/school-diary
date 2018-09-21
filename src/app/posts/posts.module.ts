import { PostCreateComponent } from "./post-create/post-create.component";
import { PostListComponent } from "./post-list/post-list.component";
import { PamokosComponent } from "./pamokos/pamokos.component";

import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../angular-material.module";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { GradeDialogComponent } from "./post-list/grade-dialog/grade-dialog.component";


@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent,
    PamokosComponent,
    GradeDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ],

  entryComponents: [GradeDialogComponent]
})
export class PostsModule {}
