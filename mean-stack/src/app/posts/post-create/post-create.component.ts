import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  constructor(private postService: PostService) {}

  ngOnInit(): void {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: Post = {
      id: 'null',
      title: form.value.title,
      content: form.value.content,
    };
    this.postService.addPosts(post);
    form.resetForm();
  }
}
