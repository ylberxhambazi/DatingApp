import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router'
import { AuthService } from '../_services/auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot): boolean {
    const roles = next.firstChild.data['roles'] as Array<string>
    if (roles) {
      const match = this.authService.roleMatch(roles)
      if (match) {
        return true
      } else {
        this.router.navigate(['main'])
        alert('You are not authorised to access this area')
      }
    }
    if (this.authService.firebaseLogin())
      return true
    if (this.authService.loggedIn()) {
      return true
    }
    this.router.navigate(['/auth'])
    return false
  }
}
