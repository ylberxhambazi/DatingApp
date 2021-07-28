import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { LoginDialogComponent } from 'src/app/shared/ui/dialog/login-dialog/login-dialog.component'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
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

  ngOnInit(): void {}

  onRegistration() {
    this.router.navigateByUrl('/auth/registration')
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent, {
      panelClass: 'login-modal',
    })
  }
}
