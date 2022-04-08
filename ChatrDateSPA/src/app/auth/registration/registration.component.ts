import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { LoginDialogComponent } from 'src/app/shared/ui/dialog/login-dialog/login-dialog.component'
import { User } from 'src/app/_models/user'
import { AuthService } from 'src/app/_services/auth.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  user: User
  registerForm: FormGroup

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    private fb: FormBuilder
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

  ngOnInit(): void {
    this.createRegisterForm()
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['2004-01-01', Validators.required],
      gender: ['male'],
      lookingFor: ['female']
    })
  }

  passwordMatchGenerator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true }
  }

  onRegistration() {
    this.router.navigateByUrl('/auth/registration')
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent, {
      panelClass: 'login-modal',
    })
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        console.log('Registration successful')
      }, error => {
        console.log(error)
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.authService.firebaseLogin();
          this.router.navigate(['/main']);
        })
      })
    }
  }
}
