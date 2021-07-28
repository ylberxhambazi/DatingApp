import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { HeaderComponent } from './layout/header/header.component'
import { FooterComponent } from './layout/footer/footer.component'
import { ProfileTeaserComponent } from './ui/card/profile-teaser/profile-teaser.component'
import { ArticleComponent } from './layout/article/article.component'
import { RegisterDialogComponent } from './ui/dialog/register-dialog/register-dialog.component'
import { StreamTeaserComponent } from './ui/card/stream-teaser/stream-teaser.component'
import { MainHeaderComponent } from './layout/main-header/main-header.component'
import { MainFooterComponent } from './layout/main-footer/main-footer.component'

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu'
import { MatCardModule } from '@angular/material/card'
import { NgxGalleryModule } from '@kolkov/ngx-gallery'

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProfileTeaserComponent,
    ArticleComponent,
    RegisterDialogComponent,
    StreamTeaserComponent,
    MainHeaderComponent,
    MainFooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    NgxGalleryModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ProfileTeaserComponent,
    ArticleComponent,
    StreamTeaserComponent,
    MainHeaderComponent,
    MainFooterComponent
  ],
})
export class SharedModule { }
