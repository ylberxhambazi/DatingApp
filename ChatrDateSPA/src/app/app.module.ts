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
import { RouterModule } from '@angular/router'
import { ListLikeResolver } from './_resolvers/list-like.resolver'
import { MatExpansionModule } from '@angular/material/expansion'
import { ListFavoritesResolver } from './_resolvers/list-favorites.resolver'
import { ListVisitorResolver } from './_resolvers/list-visitors.resolver'
import { AngularFireModule } from '@angular/fire'
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { environment } from 'src/environments/environment'
import { ChatDetailResolver } from './_resolvers/chat-detail.resolver'
import { ChatService } from './_services/chat.service'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { DatePipe } from '@angular/common';
import { RolesModalComponent } from './admin/roles-modal/roles-modal.component'
import { ModalModule } from 'ngx-bootstrap/modal';

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
    MatExpansionModule,
    NgxGalleryModule,
    HammerModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ModalModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5001'],
        disallowedRoutes: ['localhost:5001/api/Auth'],
      },
    }),
  ],

  providers: [AuthService, ErrorInterceptorProvide, AuthGuard, UserService, ProfileEditResolver, PreventUnsavedChanges, ProfileDetailResolver, ProfileListResolver, ListLikeResolver, ListFavoritesResolver, ListVisitorResolver, ChatDetailResolver, ChatService, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [LoginDialogComponent, RolesModalComponent],
})
export class AppModule { }
