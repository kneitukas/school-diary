import { Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']

})
export class PostCreateComponent {
  enteredValue: string;
  content = '';

  onAddPost(input: HTMLTextAreaElement) {
    console.dir(input);
    this.content = this.enteredValue;
    this.enteredValue = '';
  }
}
