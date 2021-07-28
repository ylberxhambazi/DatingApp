import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { JwtHelperService } from '@auth0/angular-jwt'
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { User } from '../_models/user'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl + 'Auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('./assets/images/profile/fallback-male.jpg');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) { }

  changeProfilePhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
          this.changeProfilePhoto(this.currentUser.photoUrl);
        }
      })
    )
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model)
  }

  loggedIn() {
    const token = localStorage.getItem('token')
    return !this.jwtHelper.isTokenExpired(token)
  }
}
