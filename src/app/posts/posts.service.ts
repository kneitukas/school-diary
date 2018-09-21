import { Post } from "./posts.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import {HttpClient} from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";


const posts_URL = environment.api_URL + "/posts/";
const lessons_URL = environment.api_URL + "/api/lessons/";


@Injectable({providedIn: "root"})
export class PostsService {
  private posts: Post[] = [];
  private lessons: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  private lessonsUpdated = new Subject<Post[]>();

  constructor(
    private http: HttpClient,
    private router: Router,
    ) {}

  getPosts() {
    this.http.get<{message: string, posts: any}>(posts_URL)
    .pipe(map((postData) => {
      return postData.posts.map(post => {
      return {
        title: post.title,
        content: post.content,
        id: post._id,
        creator: post.creator
      };
      });
    }))
      .subscribe((transformedPosts) => {
        console.log(transformedPosts);
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdate() {
    return this.postsUpdated.asObservable();
  }

  getLessonUpdate() {
    return this.lessonsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{_id: string, title: string, content: string}>(posts_URL + id);
  }

  getLessons(id: string) {
    return this.http.get<{_id: string, title: string, content: string}>(lessons_URL + id);
  }

  addPost(title: string, content: string) {
    const post: Post = {id: null, title: title, content: content};
    this.http.post<{message: string, postId: string}>(posts_URL, post)
      .subscribe((responseData) => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  addLesson(title: string, content: string) {
    const lesson: Post = {id: null, title: title, content: content};
    this.http.post<{message: string, postId: string}>(lessons_URL, lesson)
      .subscribe((responseData) => {
        const id = responseData.postId;
        lesson.id = id;
        this.lessons.push(lesson);
        this.postsUpdated.next([...this.lessons]);
        // this.router.navigate(['/']);
        console.log(responseData);
      });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content};
    this.http.put(posts_URL + id, post)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
    this.http.delete(posts_URL + postId)
    .subscribe(() => {
     const updatedPosts = this.posts.filter(post => postId !== post.id);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }
}
