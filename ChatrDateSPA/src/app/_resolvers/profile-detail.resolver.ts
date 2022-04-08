import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { User } from '../_models/user'
import { UserService } from '../_services/user.service'

@Injectable()
export class ProfileDetailResolver implements Resolve<User> {
  constructor(private userService: UserService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(route.params['id']).pipe(
      catchError(error => {
        error('Problem retrieving data');
        this.router.navigate(['/profile']);
        return of(null);
      })
    );
  }
}
