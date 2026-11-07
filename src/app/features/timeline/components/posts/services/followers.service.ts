import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FollowersService {
  private readonly httpClient = inject(HttpClient);

  getFollowers(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `users/suggestions?limit=4`);
  }
}
