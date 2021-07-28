import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { LandingpageComponent } from './landingpage/landingpage.component'
import { LoginComponent } from './login/login.component'
import { RegistrationComponent } from './registration/registration.component'

const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: '',
    component: LandingpageComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
