import { Component, OnInit } from '@angular/core'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/_services/auth.service'
import { ChatService } from 'src/app/_services/chat.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  model: any = {}
  constructor(
    private authService: AuthService,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'google-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/google-logo-icon.svg')
    )
    this.matIconRegistry.addSvgIcon(
      'facebook-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/facebook-logo-icon.svg')
    )
  }

  ngOnInit(): void { }

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        console.log('Logged in successfully')
      },
      (error) => {
        console.log('Failed to login')
      },
      () => {
        this.authService.firebaseLogin()
        this.router.navigate(['/main'])
      }
    )
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  firebaseLogin() {
    return this.authService.firebaseLogin();
  }

  // logout() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   this.authService.signOut();
  //   // this.chatService.signOut();
  //   this.authService.decodedToken = null;
  //   this.authService.currentUser = null;
  //   this.router.navigate(['/auth']);
  // }
}
