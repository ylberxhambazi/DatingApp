import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/_services/auth.service'

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css'],
})
export class RegisterDialogComponent implements OnInit {
  model: any = {}
  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private authService: AuthService
  ) {
    this.matIconRegistry.addSvgIcon(
      'google-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/google-logo-icon.svg')
    )
  }

  ngOnInit(): void {}
  onCloseDialog(): void {
    this.dialogRef.close()
  }

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        console.log('Logged in successfully')
        this.router.navigateByUrl('/main')
      },
      (error) => {
        console.log('Failed to login')
      }
    )
  }
}
