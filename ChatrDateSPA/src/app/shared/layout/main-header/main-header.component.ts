import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/_services/auth.service'
import { ChatService } from 'src/app/_services/chat.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css'],
})
export class MainHeaderComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  constructor(public authService: AuthService, public chatService: ChatService, private router: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  loggedIn() {
    const token = localStorage.getItem('token')
    return !!token
  }

  firebaseLogin() {
    return this.authService.firebaseLogin();
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.authService.signOut();
    this.chatService.signOut();
    this.router.navigateByUrl('/auth/login');
    window.location.reload();
  }

  onMyProfile() {
    return
  }
}
