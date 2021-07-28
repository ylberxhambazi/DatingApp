import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AuthRoutingModule } from './auth-routing.module'
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha'

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatSelectModule } from '@angular/material/select'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatGridListModule } from '@angular/material/grid-list'

// Component
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { LandingpageComponent } from './landingpage/landingpage.component'
import { RegistrationComponent } from './registration/registration.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { SharedModule } from '../shared/shared.module'
import { LoginComponent } from './login/login.component'

@NgModule({
  declarations: [ForgotPasswordComponent, LandingpageComponent, RegistrationComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MatCheckboxModule,
    MatGridListModule,
  ],
})
export class AuthModule {}
