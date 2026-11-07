import { CommentsService } from './../../services/comments.service';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Comment } from '../../models/comment.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-comments',
  imports: [ReactiveFormsModule, DatePipe, CommentsComponent],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  content = new FormControl('');
  editContent = new FormControl('');
  user = signal(JSON.parse(localStorage.getItem('user')!));
  postId = input.required<string>();
  allComments = signal<Comment[]>([]);
  file = signal<File | null>(null);
  imgSrc = signal('');
  showEditCommentModal = signal(false);
  editImgSrc = signal<string | ''>('');
  editFileImg = signal<File | null>(null);
  editcomment = signal<Comment>({} as Comment);
  private readonly commentsService = inject(CommentsService);

  ngOnInit(): void {
    this.getCommentsData();
  }

  getCommentsData(): void {
    this.commentsService.getAllComments(this.postId()).subscribe({
      next: (res) => {
        if (res.success) {
          this.allComments.set(res.data.comments);
        }
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

  deletePhoto(): void {
    this.imgSrc.set('');
  }

  sendForm(e: SubmitEvent) {
    e.preventDefault();

    let formData = new FormData();
    if (this.content.value) {
      formData.append('content', this.content.value);
    }

    if (this.file()) {
      formData.append('image', this.file()!);
    }

    this.commentsService.createComment(this.postId(), formData).subscribe({
      next: (res) => {
        console.log(res);
        if (res.success) {
          this.getCommentsData();
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        (e.target as HTMLFormElement).reset();
        this.imgSrc.set('');
      },
    });
  }

  deleteItem(id: string) {
    this.commentsService.deleteComment(this.postId(), id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.success) {
          this.getCommentsData();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openModal(comment: Comment): void {
    this.editcomment.set(comment);
    this.showEditCommentModal.set(true);
    this.editContent.patchValue(comment.content);
    this.editImgSrc.set(comment.image || '');
    this.editFileImg.set(null);
  }

  hideModal(): void {
    this.showEditCommentModal.set(false);
  }

  editImage(e: Event) {
    let input = e.target as HTMLInputElement;
    if (input.files) {
      console.log(input.files[0]);

      this.editFileImg.set(input.files[0]);

      this.editImgSrc.set(URL.createObjectURL(input.files[0]));
    }
  }
  removeEditImg(): void {
    this.editFileImg.set(null);
    this.editImgSrc.set('');
  }

  sendEditComment(e: SubmitEvent) {
    e.preventDefault();
    let formData = new FormData();
    if (this.editContent.value) {
      formData.append('content', this.editContent.value);
    }

    if (this.editFileImg()) {
      formData.append('image', this.editFileImg()!);
    } else {
      formData.append('image', '');
    }

    this.commentsService.updateComment(this.postId(), this.editcomment()._id, formData).subscribe({
      next: (res) => {
        console.log(res);
        if (res.success) {
          this.getCommentsData();
        }
        console.log(this.postId());
        console.log(this.editcomment()._id);
      },

      error: (err) => {
        console.log(err);
      },
    });
    this.showEditCommentModal.set(false);
  }
}
