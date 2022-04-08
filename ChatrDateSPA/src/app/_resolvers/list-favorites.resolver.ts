import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { User } from '../_models/user'
import { UserService } from '../_services/user.service'

@Injectable()
export class ListFavoritesResolver implements Resolve<User[]> {
    pageNumber = 1;
    pageSize = 20;
    favoritesParam = 'FavoritsActives';

    constructor(private userService: UserService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber, this.pageSize, null, null, this.favoritesParam).pipe(
            catchError((error) => {
                error('Problem retrieving data')
                this.router.navigate(['/main'])
                return of(null)
            })
        )
    }
}
