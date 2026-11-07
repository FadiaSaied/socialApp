import { Component, inject, OnInit, signal } from '@angular/core';
import { MyprofileService } from './services/myprofile.service';
import { Myprofile } from './models/myprofile.interface';
import { DatePipe } from '@angular/common';
import { Post } from '../timeline/components/posts/models/post.interface';
import { CommentsComponent } from '../timeline/components/posts/components/comments/comments.component';

@Component({
  selector: 'app-profile',
  imports: [DatePipe, CommentsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profile = signal<Myprofile>({} as Myprofile);
  myPosts = signal<Post[]>([]);
  myBookmarks = signal([]);
  file = signal<File | null>(null);
  private readonly myprofileService = inject(MyprofileService);

  ngOnInit(): void {
    this.getProfileDate();
    this.getPostsData();
    this.getmyBookmarks();
  }
  getProfileDate(): void {
    this.myprofileService.getMyProfile().subscribe({
      next: (res) => {
        if (res.success) {
          this.profile.set(res.data.user);
        }

        // console.log(res.data.user);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getPostsData(): void {
    this.myprofileService.getMyPosts().subscribe({
      next: (res) => {
        if (res.success) {
          this.myPosts.set(res.data.posts);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getmyBookmarks(): void {
    this.myprofileService.getBookMark().subscribe({
      next: (res) => {
        if (res.success) {
          this.myBookmarks.set(res.data.bookmarks);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  uploadPhoto(e: Event) {
    let input = e.target as HTMLInputElement;

    if (input.files) {
      console.log(input.files[0]);
      this.file.set(input.files[0]);
    }

    let formData = new FormData();

    if (this.file()) {
      formData.append('photo', this.file()!);
    }

    this.myprofileService.updatePhoto(formData).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
