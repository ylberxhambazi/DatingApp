import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/_services/auth.service'

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css'],
})
export class MainHeaderComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  loggedIn() {
    const token = localStorage.getItem('token')
    return !!token
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.router.navigateByUrl('/auth/login')
    console.log('logged out')
  }

  onMyProfile() {
    return
  }
}
