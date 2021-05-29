import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../post.model';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  content = '';
  title = '';
  // change mode to enum
  private mode = 'create';
  private postId: string | any = '';
  post: Post | undefined;
  isLoading = false;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPostById(this.postId).subscribe((responseData) => {
          this.isLoading = false;
          this.post = responseData;
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const post: Post = {
      id: 'null',
      title: form.value.title,
      content: form.value.content,
    };
    post.id = this.postId;
    if (this.mode == 'create') {
      this.postService.addPosts(post);
    } else {
      this.postService.updatePost(this.postId, post);
    }
    form.resetForm();
  }
}
