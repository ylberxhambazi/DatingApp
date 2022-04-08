import { Component, Input, OnInit } from '@angular/core'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery'
import { User } from 'src/app/_models/user'
import { AuthService } from 'src/app/_services/auth.service'
import { ChatService } from 'src/app/_services/chat.service'
import { UserService } from 'src/app/_services/user.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  breakpoint: number;
  // details = [
  //   {
  //     dt: "Looking For",
  //     dd: "Men"
  //   },
  //   {
  //     dt: "Interested in",
  //     dd: "Acquaintance"
  //   },
  //   {
  //     dt: "Relationship status",
  //     dd: ""
  //   },
  //   {
  //     dt: "Height",
  //     dd: "5'9"
  //   },
  //   {
  //     dt: "Body",
  //     dd: "Normal"
  //   },
  //   {
  //     dt: "Kids",
  //     dd: "One Kid"
  //   },
  //   {
  //     dt: "Smoker",
  //     dd: ""
  //   },
  //   {
  //     dt: "Alcohol",
  //     dd: "Never"
  //   }, {
  //     dt: "Education",
  //     dd: "High school dipioma"
  //   }, {
  //     dt: "Profession",
  //     dd: ""
  //   }, {
  //     dt: "Language",
  //     dd: "Russian"
  //   }
  // ]
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  presence$

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private chatService: ChatService
  ) {
    this.matIconRegistry.addSvgIcon(
      'kiss-icon-white',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/kiss-white.svg')
    )
  }

  ngOnInit(): void {
    this.onUpdateGridColumn();

    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.galleryOptions = [{
      width: '350px',
      height: '350px',
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false
    }];
    this.galleryImages = this.getImages();
    this.getOnlineStatus()
  }

  getOnlineStatus() {
    this.presence$ = this.chatService.getPresence(this.user.userName)
  }

  getImages() {
    let imageUrls = [];
    for (let photo of this.user.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url
      });
    }
    return imageUrls;
  }

  onResize(event) {
    this.onUpdateGridColumn()
  }

  onUpdateGridColumn() {
    // update profile image column
    if (window.innerWidth >= 1400) {
      this.breakpoint = 3
    } else {
      this.breakpoint = 2
    }
  }

  sendLike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(
      (data) => {
        console.log('You have liked: ' + this.user.userName)
      },
      (error) => {
        error = error
      }
    )
  }
  FavoritsActives(id: number) {
    this.userService.FavoritsActives(this.authService.decodedToken.nameid, id).subscribe(
      (data) => {
        console.log('You favorite this profile: ' + this.user.userName)
      },
      (error) => {
        error = error
      }
    )
  }

}
