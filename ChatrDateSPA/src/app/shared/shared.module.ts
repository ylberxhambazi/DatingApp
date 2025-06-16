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
import { AdminPanelComponent } from '../admin/admin-panel/admin-panel.component'
import { HasRoleDirective } from '../_directives/has-role.directive'
import { TabsModule } from 'ngx-bootstrap/tabs'
import { MatTabsModule } from '@angular/material/tabs'
import { UserManagementComponent } from '../admin/user-management/user-management.component'
import { PhotoManagementComponent } from '../admin/photo-management/photo-management.component'
import { AdminService } from '../_services/admin.service'
import { ChatManagementComponent } from '../admin/chat-management/chat-management.component'
import { FormsModule } from '@angular/forms'
import { MatListModule } from '@angular/material/list'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        ProfileTeaserComponent,
        ArticleComponent,
        RegisterDialogComponent,
        StreamTeaserComponent,
        MainHeaderComponent,
        MainFooterComponent,
        AdminPanelComponent,
        HasRoleDirective,
        UserManagementComponent,
        PhotoManagementComponent,
        ChatManagementComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
        MatCardModule,
        MatCardModule,
        MatListModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        NgxGalleryModule,
        MatTabsModule,
        TabsModule.forRoot()
    ],
    providers: [AdminService],
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
