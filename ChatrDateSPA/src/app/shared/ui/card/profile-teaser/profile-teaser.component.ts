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

@Component({
  selector: 'app-profile-teaser',
  templateUrl: './profile-teaser.component.html',
  styleUrls: ['./profile-teaser.component.css'],
})
export class ProfileTeaserComponent implements OnInit {
  @Input() profile: User
  @Input() type: string
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.matIconRegistry.addSvgIcon(
      'kiss-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/kiss.svg')
    )
  }

  ngOnInit() {
    // this.galleryOptions = [{
    //   width: '350px',
    //   height: '267px',
    //   imagePercent: 100,
    //   thumbnailsColumns: 4,
    //   imageAnimation: NgxGalleryAnimation.Slide,
    //   preview: false
    // }];
    // this.galleryImages = this.getImages();
    // console.log(this.profile.photos)
  }

  // getImages() {
  //   const imageUrls = [];
  //   console.log('hello')
  //   for (const photo of this.profile.photos) {
  //     console.log(photo.url);
  //     imageUrls.push({
  //       small: photo.url,
  //       medium: photo.url,
  //       big: photo.url
  //     });
  //   }
  //   return imageUrls;
  // }

  // getImgSrc(img: string) {
  //   if (img) {
  //     return this.profile.photos;
  //   }
  // }

  getDisplayName() {
    return this.profile.username + ', ' + this.profile.age
  }
  getOnlineStatus() {
    return this.profile.lastActive ? 'onlineStatus online' : 'onlineStatus offline'
  }

  sendLike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(
      (data) => {
        console.log('You have liked: ' + this.profile.username)
      },
      (error) => {
        error = error
      }
    )
  }
}
