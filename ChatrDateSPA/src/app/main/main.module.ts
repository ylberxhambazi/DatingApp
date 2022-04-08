import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MainRoutingModule } from './main-routing.module'
import { MainComponent } from './main.component'
import { ChatsComponent } from './chats/chats.component'
import { InboxComponent } from './inbox/inbox.component'
import { VisitorsComponent } from './visitors/visitors.component'
import { LikesComponent } from './likes/likes.component'
import { FavoritesComponent } from './favorites/favorites.component'
import { SearchComponent } from './search/search.component'
import { MyProfileComponent } from './my-profile/my-profile.component'
import { MainPageComponent } from './main-page/main-page.component'

import { SharedModule } from '../shared/shared.module'

import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatSliderModule } from '@angular/material/slider'
import { FormsModule } from '@angular/forms'
import { MatDividerModule } from '@angular/material/divider'
import { ChatComponent } from './chat/chat.component'
import { ProfileComponent } from './profile/profile.component'
import { HammerModule } from '@angular/platform-browser'
import { NgxGalleryModule } from '@kolkov/ngx-gallery'
import { FileUploadModule } from 'ng2-file-upload'
import { PhotoEditorComponent } from '../shared/ui/card/photo-editor/photo-editor.component'
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { DateAgoPipe } from '../_pipes/DateAgoPipe.pipe';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsComponent } from './terms/terms.component';
import { FaqComponent } from './faq/faq.component'
import { RolesModalComponent } from '../admin/roles-modal/roles-modal.component'

@NgModule({
  declarations: [
    MainComponent,
    InboxComponent,
    VisitorsComponent,
    LikesComponent,
    FavoritesComponent,
    SearchComponent,
    MyProfileComponent,
    MainPageComponent,
    ChatsComponent,
    ChatComponent,
    ProfileComponent,
    PhotoEditorComponent,
    DateAgoPipe,
    PrivacyPolicyComponent,
    TermsComponent,
    FaqComponent,
    RolesModalComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    SharedModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatGridListModule,
    MatPaginatorModule,
    NgxGalleryModule,
    HammerModule,
    MatExpansionModule,
    MatSliderModule,
    MatDividerModule,
    FileUploadModule,
    PaginationModule.forRoot()
  ]
})
export class MainModule { }
