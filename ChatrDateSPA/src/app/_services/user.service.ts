import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { PaginatedResult } from '../_models/pagination'
import { User } from '../_models/user'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getUsers(page?, itemsPerPage?, userParams?, likesParam?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
    }

    if (likesParam === 'Likers') {
      params = params.append('Likers', 'true');
    }

    if (likesParam === 'Likees') {
      params = params.append('Likees', 'true');
    }

    return this.http.get<User[]>(this.baseUrl + 'Users', { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))
        }
        return paginatedResult;
      })
    );
  }
  // getSamples(): Observable<Sample[]> {
  //   return this.http.get<Sample[]>(this.baseUrl + 'Samples')
  // }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'Users/' + id)
  }
  // getSample(memberId): Observable<Sample> {
  //   return this.http.get<Sample>(this.baseUrl + 'Samples' + memberId)
  // }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'Users/' + id, user)
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(this.baseUrl + 'Users/' + userId + "/Photos/" + id + "/setMain", {});
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'Users/' + userId + "Photos/" + id);
  }

  sendLike(id: number, recepientId: number) {
    return this.http.post(this.baseUrl + 'Users/' + id + '/like/' + recepientId, {})
  }
}
