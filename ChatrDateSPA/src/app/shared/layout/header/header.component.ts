import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { LoginDialogComponent } from '../../ui/dialog/login-dialog/login-dialog.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {}

  onLogin() {
    this.router.navigateByUrl('/auth/login')
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
