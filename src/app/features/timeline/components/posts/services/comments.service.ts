import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly httpClient = inject(HttpClient);

  getAllComments(postId: string, limit: number = 10): Observable<any> {
    return this.httpClient.get(
      environment.baseUrl + `posts/${postId}/comments?page=1&limit=${limit}`,
    );
  }

  createComment(postId: string, data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `posts/${postId}/comments`, data);
  }

  deleteComment(postId: string, commentId: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `posts/${postId}/comments/${commentId}`);
  }

  updateComment(postId: string, commentId: string, data: object): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `posts/${postId}/comments/${commentId}`, data);
  }
}
