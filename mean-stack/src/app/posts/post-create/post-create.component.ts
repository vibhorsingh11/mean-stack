import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup;
  imagePreview: string;

  constructor(private postService: PostService, private route: ActivatedRoute) {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPostById(this.postId).subscribe((responseData) => {
          this.isLoading = false;
          this.post = responseData;
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    const post: Post = {
      id: 'null',
      title: this.form.value.title,
      content: this.form.value.content,
    };
    post.id = this.postId;
    if (this.mode == 'create') {
      this.postService.addPosts(post);
    } else {
      this.postService.updatePost(this.postId, post);
    }
    this.form.reset();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result.toString();
    };
    reader.readAsDataURL(file);
  }
}
