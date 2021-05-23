import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: Post[] }>(
        'http://localhost:3000/api/posts'
      )
      .subscribe((postsData) => {
        this.posts = postsData.posts;
        this.postUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPosts(post: Post) {
    this.http
      .post<{ message: string }>('http://localhost:3000/api/posts', post)
      .subscribe((response) => {
        console.log(response);
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });
  }
}
