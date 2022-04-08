import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { LoginDialogComponent } from 'src/app/shared/ui/dialog/login-dialog/login-dialog.component'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotpwdForm: FormGroup
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`)
  }

  constructor(public dialog: MatDialog, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.forgotpwdForm = this.fb.group({
      userName: [''],
      recaptchaReactive: [null],
    })
  }
  Submit() {
    console.log('Login Forgot password')
  }

  onRegistration() {
    this.router.navigateByUrl('/auth/registration')
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent, {
      panelClass: 'login-modal',
    })
  }
}
