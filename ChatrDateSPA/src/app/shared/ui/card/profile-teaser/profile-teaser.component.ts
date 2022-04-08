import { Component, Input, OnInit } from '@angular/core'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { ProfileTeaser } from 'src/app/interfaces'
import { User } from 'src/app/_models/user'
import { Sample } from 'src/app/_models/sample'
import { ActivatedRoute } from '@angular/router'
import { Photo } from 'src/app/_models/photo'
import { UserService } from 'src/app/_services/user.service'
import { AuthService } from 'src/app/_services/auth.service'
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery'
import { ChatService } from 'src/app/_services/chat.service'
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-profile-teaser',
  templateUrl: './profile-teaser.component.html',
  styleUrls: ['./profile-teaser.component.css'],
})
export class ProfileTeaserComponent implements OnInit {
  @Input() user: User
  @Input() type: string
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  presenceList: AngularFireObject<any>
  presence: Observable<any>
  presence$
  users: User = JSON.parse(localStorage.getItem('user'));
  userTogether

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private chatService: ChatService,
    private db: AngularFireDatabase
  ) {
    this.matIconRegistry.addSvgIcon(
      'kiss-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/kiss.svg')
    )
  }

  ngOnInit() {
    this.getOnlineStatus()
  }

  getDisplayName() {
    return this.user['username'] + ', ' + this.user.age
  }
  getOnlineStatus() {
    this.presence$ = this.chatService.getPresence(this.user['username'])
  }

  sendLike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(
      (data) => {
        console.log('You have liked: ' + this.user['username'])
      },
      (error) => {
        error = error
      }
    )
  }
  visitorCount(id: number) {
    this.userService.visitorCount(this.authService.decodedToken.nameid, id).subscribe(
      (data) => {
        console.log('You visited profile: ' + this.user['username'])
      },
      (error) => {
        error = error
      }
    )
  }
}
