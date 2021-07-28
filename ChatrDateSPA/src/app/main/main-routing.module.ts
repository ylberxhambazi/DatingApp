import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ProfileTeaserComponent } from '../shared/ui/card/profile-teaser/profile-teaser.component'
import { PreventUnsavedChanges } from '../_guards/prevent-unsaved-changes.guard'
import { ProfileEditService } from '../_resolvers/profile-edit.resolver'
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

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'chats',
        component: ChatsComponent,
      },
      {
        path: 'chat/:id',
        component: ChatComponent,
      },
      {
        path: 'inbox',
        component: InboxComponent,
      },
      {
        path: 'visitors',
        component: VisitorsComponent,
      },
      {
        path: 'likes',
        component: LikesComponent,
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
      },
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'my-profile',
        component: MyProfileComponent,
        resolve: { user: ProfileEditService },
        canDeactivate: [PreventUnsavedChanges],
      },
      {
        path: 'profile/:id',
        component: ProfileComponent,
        resolve: { user: ProfileDetailResolver }
      },
      {
        path: '',
        component: MainPageComponent,
        pathMatch: 'full'
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule { }
