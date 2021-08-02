import { BrowserModule, HammerModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { HttpClientModule } from '@angular/common/http'
import { MatInputModule } from '@angular/material/input'

import { LoginDialogComponent } from './shared/ui/dialog/login-dialog/login-dialog.component'
import { AuthService } from './_services/auth.service'
import { ErrorInterceptorProvide } from './_services/error.interceptor'
import { AuthGuard } from './_guards/auth.guard'
import { UserService } from './_services/user.service'
import { JwtModule } from '@auth0/angular-jwt'
import { ProfileEditResolver } from './_resolvers/profile-edit.resolver'
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard'
import { ProfileDetailResolver } from './_resolvers/profile-detail.resolver'
import { NgxGalleryModule } from '@kolkov/ngx-gallery'
import { ProfileListResolver } from './_resolvers/profile-list.resolver'
import { TimeAgoPipe } from 'time-ago-pipe'
import { RouterModule } from '@angular/router'

export function tokenGetter() {
  return localStorage.getItem('token')
}

@NgModule({
  declarations: [AppComponent, LoginDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    NgxGalleryModule,
    HammerModule,
    RouterModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:44378'],
        disallowedRoutes: ['localhost:44378/api/Auth'],
      },
    })
  ],
  providers: [AuthService, ErrorInterceptorProvide, AuthGuard, UserService, ProfileEditResolver, PreventUnsavedChanges, ProfileDetailResolver, ProfileListResolver],
  bootstrap: [AppComponent],
  entryComponents: [LoginDialogComponent],
})
export class AppModule { }
