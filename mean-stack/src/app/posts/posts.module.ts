import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [PostListComponent, PostCreateComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MaterialModule],
})
export class PostsModule {}
