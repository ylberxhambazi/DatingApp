import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/_services/auth.service'

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css'],
})
export class LoginDialogComponent implements OnInit {
  model: any = {}
  // loginForm: FormGroup;
  // emailControl = new FormControl('', [Validators.required, Validators.email]);
  // passwordControl = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
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

  ngOnInit() {
    // this.loginForm = this.fb.group({
    //   username: ['', Validators.email],
    //   password: ['', Validators.required]
    // });
  }

  onCloseDialog(): void {
    this.dialogRef.close()
  }

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        console.log('Logged in successfully')
        this.router.navigateByUrl('/main')
        this.dialogRef.close()
      },
      (error) => {
        console.log('Failed to login')
      }
    )
  }

  // Submit() {
  //   console.log('Login Submit');
  //   console.log(this.loginForm);
  //   //add auth login module
  //   this.dialogRef.close();
  //   this.router.navigateByUrl('/main');
  // }
}
