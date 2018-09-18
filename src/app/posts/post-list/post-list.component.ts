import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Post } from '../posts.model';
import { PostsService } from '../posts.service';
import { MatDialogRef, MatDialog} from '@angular/material';
import { GradeDialogComponent} from './grade-dialog/grade-dialog.component';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  isLoading = false;
  finalGrades = [];
  posts: Post[] = [];
  lessons: Post[] = [];
  userIsAuthenticated = false;
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  gradeDialogRef: MatDialogRef<GradeDialogComponent>;
  constructor(
    public postService: PostsService,
    private dialog: MatDialog,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdate()
    .subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  gradeStudent() {
    this.gradeDialogRef = this.dialog.open(GradeDialogComponent, {
      hasBackdrop: true,
      width: '500px',
      data: {
        name: this.posts[0].title,
        lastName: this.posts[0].content,
        lesson: this.lessons[0]}
    });

    this.gradeDialogRef
    .afterClosed()
    .subscribe(result => {
        if (result) {
          this.finalGrades.push(result);
        }
      });
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
