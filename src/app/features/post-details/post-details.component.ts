import { Post } from './../timeline/components/posts/models/post.interface';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../timeline/components/posts/services/posts.service';
import { CommentsComponent } from '../timeline/components/posts/components/comments/comments.component';

@Component({
  selector: 'app-post-details',
  imports: [CommentsComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  post = signal<Post>({} as Post);
  userId = signal(JSON.parse(localStorage.getItem('user')!)._id);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly postsService = inject(PostsService);
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      param.get('id');
      console.log(param.get('id'));
      this.getPost(param.get('id')!);
    });
  }

  getPost(id: string): void {
    this.postsService.getSinglePost(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.success) {
          this.post.set(res.data.post);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteItem(id: string): void {
    this.postsService.deletePost(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
