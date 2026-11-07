import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MyprofileService {
  private readonly httpClient = inject(HttpClient);

  getMyProfile(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `users/profile-data`);
  }

  getMyPosts(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `posts/feed?only=following&limit=10`);
  }

  getBookMark(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `users/bookmarks`);
  }

  updatePhoto(data: object): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `users/upload-photo`, data);
  }
}
