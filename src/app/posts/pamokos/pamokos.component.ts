import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PostsService } from "../posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";



@Component({
  selector: "app-pamokos",
  templateUrl: "./pamokos.component.html",
  styleUrls: ["./pamokos.component.css"]
})
export class PamokosComponent implements OnInit {
  form: FormGroup;
  public mode = "create";
  private postId: string;
  public post: any;

  constructor(public postService: PostsService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null,
        {validators: [Validators.required]}),
      content: new FormControl(null,
        {validators: [Validators.required]})
    });
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
       if (this.mode === "create") {
      this.postService.addLesson(this.form.value.title, this.form.value.content);
    } else {
      this.postService.updatePost(this.postId, this.form.value.title, this.form.value.content);
    }
      this.form.reset();
      alert("Pamoka prideta sekmingai!");

  }

}
