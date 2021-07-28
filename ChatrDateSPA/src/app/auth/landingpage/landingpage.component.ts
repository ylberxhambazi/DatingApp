import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { ProfileTeaser } from 'src/app/interfaces'
import { LoginDialogComponent } from 'src/app/shared/ui/dialog/login-dialog/login-dialog.component'
import { RegisterDialogComponent } from 'src/app/shared/ui/dialog/register-dialog/register-dialog.component'

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css'],
})
export class LandingpageComponent implements OnInit {
  regForm: FormGroup
  minAges: any[] = [18, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75]
  maxAges: any[] = [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80]
  regStep: number = 1
  publicProfiles: ProfileTeaser[] = []
  ProfileType: string = 'public'
  breakpoint: number
  artiles: any[] = [
    {
      title: 'ChatrDate – Find a local chatter who suits you',
      content:
        'On ChatrDate you will find your local or global chatters ready in seconds, from home, on the road or traveling through our responsive app. You will chat or meet with attractive men and woman, be it for just friendship! Just a chat! Or even a bit of flirt!',
      imgPosition: 'imgRight',
      imgSrc: 'mobile-app.jpg',
    },
    {
      title: 'With our responsive app, you can be anywhere',
      content:
        'Yes, chat from anywhere, your phone, your tablet or your desktop! Chatters will be always there for you! Just browse numerous profiles and start chatting, leave a like or be liked, send a gift or be a gifter, see a profile or be a seen! No matter what you do “Chat or Date with your Chatter”',
      imgPosition: 'imgLeft',
      imgSrc: 'mood-web.jpg',
    },
    {
      title: 'Completely free for women!',
      content: 'It is indeed, all women are free to chat and have unlimited fun',
      imgPosition: 'imgRight',
      imgSrc: 'heart.jpg',
    },
    {
      title: 'Your Data and Profile protection',
      content: 'Your safety is provided by leading Safety & Security System in the industry',
      imgPosition: '',
      imgSrc: '',
    },
    {
      title: 'Search by city',
      content: 'Find a suitable chatter in your city',
      imgPosition: '',
      imgSrc: '',
    },
    {
      title: 'Try out for free!',
      content:
        'No hidden costs, you will get free 150 credits, once you get into paid feature then everything gets transparent, you will be informed immediately whenever you buy coins',
      imgPosition: '',
      imgSrc: '',
    },
    {
      title: 'Time to either chat, date, flirt or just have fun your way!',
      content: '',
      imgPosition: '',
      imgSrc: '',
    },
  ]

  constructor(
    public dialog: MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private fb: FormBuilder
  ) {
    this.matIconRegistry.addSvgIcon(
      'google-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/google-logo-icon.svg')
    )
    this.matIconRegistry.addSvgIcon(
      'facebook-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/facebook-logo-icon.svg')
    )
    this.matIconRegistry.addSvgIcon(
      'male-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/male.svg')
    )
    this.matIconRegistry.addSvgIcon(
      'female-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/male.svg')
    )
  }

  ngOnInit(): void {
    this.regForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.email],
      ageCtl: ['', Validators.required],
    })

    this.onUpdateGridColumn()
  }

  onResize(event) {
    this.onUpdateGridColumn()
  }

  onUpdateGridColumn() {
    // update profile image column
    if (window.innerWidth >= 1400) {
      this.breakpoint = 8
    } else if (window.innerWidth >= 1024) {
      this.breakpoint = 6
    } else if (window.innerWidth >= 650) {
      this.breakpoint = 4
    } else {
      this.breakpoint = 2
    }
    this.publicProfiles = new Array()
    if (this.breakpoint > 2) {
      for (var idx = 0; idx < this.breakpoint * 2; idx++) {
        this.publicProfiles.push({
          name: 'abc' + (idx + 1),
          image: ['abc' + (idx + 1) + '.jpg'],
          online: true,
        })
      }
    } else {
      for (var idx = 0; idx < 8; idx++) {
        this.publicProfiles.push({
          name: 'abc' + (idx + 1),
          image: ['abc' + (idx + 1) + '.jpg'],
          online: true,
        })
      }
    }
  }

  Submit() {
    this.dialog.open(RegisterDialogComponent, {
      panelClass: 'register-dialog',
    })
  }
}
