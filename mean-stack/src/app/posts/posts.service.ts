import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<{ posts: Post[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${postPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        'http://localhost:3000/api/posts' + queryParams
      )
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map((post: any) => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator,
              };
            }),
            maxPosts: postData.maxPosts,
          };
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts.posts;
        this.postUpdated.next({
          posts: [...this.posts],
          postCount: transformedPosts.maxPosts,
        });
      });
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  getPostById(id: string) {
    return this.http.get<Post>('http://localhost:3000/api/posts/' + id);
  }

  addPosts(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    this.http
      .post<{ message: string; post: Post }>(
        'http://localhost:3000/api/posts',
        postData
      )
      .subscribe((response) => {
        this.router.navigate(['/']);
      });
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image == 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: null,
      };
    }
    this.http
      .put('http://localhost:3000/api/posts/' + id, postData)
      .subscribe((response) => {
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    return this.http.delete('http://localhost:3000/api/posts/' + postId);
  }
}
