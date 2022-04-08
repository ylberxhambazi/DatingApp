import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { User } from '../_models/user'
import { UserService } from '../_services/user.service'

@Injectable()
export class ListVisitorResolver implements Resolve<User[]> {
    pageNumber = 1;
    pageSize = 20;
    visitorParam = 'VisitorCount';

    constructor(private userService: UserService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber, this.pageSize, null, null, null, this.visitorParam).pipe(
            catchError((error) => {
                error('Problem retrieving data')
                this.router.navigate(['/main'])
                return of(null)
            })
        )
    }
}
