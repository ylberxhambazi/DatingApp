import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { PreventUnsavedChanges } from '../_guards/prevent-unsaved-changes.guard'
import { ProfileEditResolver } from '../_resolvers/profile-edit.resolver'
import { ProfileDetailResolver } from '../_resolvers/profile-detail.resolver'
import { ChatComponent } from './chat/chat.component'
import { ChatsComponent } from './chats/chats.component'
import { FavoritesComponent } from './favorites/favorites.component'
import { InboxComponent } from './inbox/inbox.component'
import { LikesComponent } from './likes/likes.component'
import { MainPageComponent } from './main-page/main-page.component'
import { MainComponent } from './main.component'
import { MyProfileComponent } from './my-profile/my-profile.component'
import { ProfileComponent } from './profile/profile.component'
import { SearchComponent } from './search/search.component'
import { VisitorsComponent } from './visitors/visitors.component'
import { ListLikeResolver } from '../_resolvers/list-like.resolver'
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component'
import { TermsComponent } from './terms/terms.component'
import { FaqComponent } from './faq/faq.component'
import { ListVisitorResolver } from '../_resolvers/list-visitors.resolver'
import { ListFavoritesResolver } from '../_resolvers/list-favorites.resolver'
import { ProfileListResolver } from '../_resolvers/profile-list.resolver'
import { ChatDetailResolver } from '../_resolvers/chat-detail.resolver'
import { AdminPanelComponent } from '../admin/admin-panel/admin-panel.component'
import { AuthGuard } from '../_guards/auth.guard'

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'chats',
        component: ChatsComponent,
        resolve: { users: ProfileListResolver }
      },
      {
        path: 'chat/:id',
        component: ChatComponent,
        resolve: { user: ChatDetailResolver }
      },
      {
        path: 'inbox',
        component: InboxComponent,
      },
      {
        path: 'visitors',
        component: VisitorsComponent,
        resolve: { user: ListVisitorResolver }
      },
      {
        path: 'likes',
        component: LikesComponent,
        resolve: { user: ListLikeResolver }
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
        resolve: { user: ListFavoritesResolver }
      },
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'my-profile',
        component: MyProfileComponent,
        resolve: { user: ProfileEditResolver },
        canDeactivate: [PreventUnsavedChanges],
      },
      {
        path: 'user/:id',
        component: ProfileComponent,
        resolve: { user: ProfileDetailResolver }
      },
      {
        path: 'privacy',
        component: PrivacyPolicyComponent
      },
      {
        path: 'terms',
        component: TermsComponent
      },
      {
        path: 'faq',
        component: FaqComponent
      },
      {
        path: 'admin',
        component: AdminPanelComponent,
        data: { roles: ['Admin', 'Moderator'] }
      },
      {
        path: '',
        component: MainPageComponent,
        pathMatch: 'full'
      },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule { }
