import { Component, inject, OnInit, signal } from '@angular/core';
import { PostsService } from './services/posts.service';
import { Post } from './models/post.interface';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommentsComponent } from './components/comments/comments.component';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TrimPipe } from '../../../../shared/pipes/trim-pipe';

@Component({
  selector: 'app-posts',
  imports: [ReactiveFormsModule, CommentsComponent, RouterLink, DatePipe, TrimPipe],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  allPosts = signal<Post[]>([]);
  post = signal<Post>({} as Post);
  userId = signal(JSON.parse(localStorage.getItem('user')!)._id);
  file = signal<File | null>(null);
  editFile = signal<File | null>(null);
  imgSrc = signal('');
  editImgSrc = signal('');
  user = signal(JSON.parse(localStorage.getItem('user')!));
  isEditModalOpen = signal(false);
  content = new FormControl('');
  privacy = new FormControl('public');
  private readonly formBuilder = inject(FormBuilder);

  editInfo = this.formBuilder.group({
    body: [''],
    privacy: [''],
    image: [''],
  });

  private readonly postsService = inject(PostsService);

  ngOnInit(): void {
    this.getPostaData();
  }
  getPostaData() {
    this.postsService.getAllPosts().subscribe({
      next: (res) => {
        this.allPosts.set(res.data.posts);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  selectPhoto(e: Event) {
    let input = e.target as HTMLInputElement;
    if (input.files) {
      this.file.set(input.files[0]);
      this.imgSrc.set(URL.createObjectURL(input.files[0]));
    }
  }

  deletePhoto() {
    this.imgSrc.set('');
    this.file.set(null);
  }

  sendForm(e: SubmitEvent, myElement: HTMLFormElement) {
    e.preventDefault();

    let formData = new FormData();

    if (this.content.value) {
      formData.append('body', this.content.value);
    }

    if (this.privacy.value) {
      formData.append('privacy', this.privacy.value);
    }

    if (this.file()) {
      formData.append('image', this.file()!);
    }

    this.postsService.createPost(formData).subscribe({
      next: (res) => {
        // console.log(res);
        this.getPostaData();
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        myElement.reset();
        this.imgSrc.set('');
        this.file.set(null);
      },
    });
  }

  deleteItem(id: string): void {
    this.postsService.deletePost(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.success) {
          this.getPostaData();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openModal(selectedPost: Post): void {
    this.post.set(selectedPost);
    this.editInfo.patchValue({
      body: selectedPost.body,
      privacy: selectedPost.privacy,
    });

    this.isEditModalOpen.set(true);
    this.editFile.set(null);
    this.editImgSrc.set(selectedPost.image || '');
  }
  hideModal(): void {
    this.isEditModalOpen.set(false);
  }

  deleteEditPhoto(): void {
    this.editFile.set(null);
    this.editImgSrc.set('');
  }

  selectEditPhoto(e: Event): void {
    const input = e.target as HTMLInputElement;

    if (input.files) {
      this.editFile.set(input.files[0]);
      this.editImgSrc.set(URL.createObjectURL(input.files[0]));
    }
  }

  updatePost(): void {
    let formData = new FormData();

    if (this.editInfo.get('body')?.value) {
      formData.append('body', this.editInfo.get('body')?.value!);
    }
    if (this.editInfo.get('privacy')?.value) {
      formData.append('privacy', this.editInfo.get('privacy')?.value!);
    }

    if (this.editFile()) {
      formData.append('image', this.editFile()!);
    }

    this.postsService.updatePost(this.post().id, formData).subscribe({
      next: (res) => {
        console.log(res);
        if (res.success) {
          this.getPostaData();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.isEditModalOpen.set(false);
  }
}
