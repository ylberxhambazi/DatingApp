import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { User } from '../_models/user'
import { AuthService } from '../_services/auth.service'
import { UserService } from '../_services/user.service'

@Injectable()
export class ProfileEditResolver implements Resolve<User> {
  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
      catchError((error) => {
        error('Problem retrieving your data')
        this.router.navigate(['profile'])
        return of(null)
      })
    )
  }
}
