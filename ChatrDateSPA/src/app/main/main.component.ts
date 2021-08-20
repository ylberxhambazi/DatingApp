import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'
import { ThemePalette } from '@angular/material/core'
import { MatIconRegistry } from '@angular/material/icon'
import { MatSliderChange } from '@angular/material/slider'
import { DomSanitizer } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { RangeType } from 'ngx-mat-range-slider'
import { StreamTeaser } from '../interfaces'
import { PaginatedResult, Pagination } from '../_models/pagination'
import { User } from '../_models/user'
import { AuthService } from '../_services/auth.service'
import { UserService } from '../_services/user.service'
import { MainPageComponent } from './main-page/main-page.component'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{ value: 'male', name: 'Males' }, { value: 'female', name: 'Females' }];
  userParams: any = {};
  pagination: Pagination;
  likesParam: string;

  streamRecords: StreamTeaser[] = [
    {
      name: 'abc1',
      image: 'abc1.jpg',
      timeAt: '20:08',
      type: 'message',
      status: 'sent',
      msg: 'sent message to you',
      online: true,
    },
    {
      name: 'abc2',
      image: 'abc2.jpg',
      timeAt: '19:00',
      type: 'message',
      status: 'visit',
      msg: 'has visited your Profile',
      online: true,
    },
    {
      name: 'abc3',
      image: 'abc3.jpg',
      timeAt: '18:00',
      type: 'message',
      status: 'sent',
      msg: 'sent message to you',
      online: true,
    },
    {
      name: 'abc4',
      image: 'abc4.jpg',
      timeAt: '17:08',
      type: 'message',
      status: 'sent',
      msg: 'sent message to you',
      online: true,
    },
    {
      name: 'abc5',
      image: 'abc5.jpg',
      timeAt: '20:08',
      type: 'message',
      status: 'sent',
      msg: 'sent message to you',
      online: true,
    },
    {
      name: 'abc6',
      image: 'abc6.jpg',
      timeAt: '20:08',
      type: 'message',
      status: 'sent',
      msg: 'sent message to you',
      online: true,
    },
    {
      name: 'abc7',
      image: 'abc7.jpg',
      timeAt: '20:08',
      type: 'message',
      status: 'sent',
      msg: 'sent message to you',
      online: true,
    },
    {
      name: 'abc8',
      image: 'abc8.jpg',
      timeAt: '20:08',
      type: 'message',
      status: 'sent',
      msg: 'sent message to you',
      online: true,
    },
    {
      name: 'abc9',
      image: 'abc9.jpg',
      timeAt: '20:08',
      type: 'message',
      status: 'sent',
      msg: 'sent message to you',
      online: true,
    },
    {
      name: 'abc10',
      image: 'abc10.jpg',
      timeAt: '20:08',
      type: 'message',
      status: 'sent',
      msg: 'sent message to you',
      online: true,
    },
    {
      name: 'abc11',
      image: 'abc11.jpg',
      timeAt: '20:08',
      type: 'message',
      status: 'sent',
      msg: 'sent message to you',
      online: true,
    },
    {
      name: 'abc12',
      image: 'abc12.jpg',
      timeAt: '20:08',
      type: 'message',
      status: 'sent',
      msg: 'sent message to you',
      online: true,
    },
    {
      name: 'abc13',
      image: 'abc13.jpg',
      timeAt: '20:08',
      type: 'message',
      status: 'sent',
      msg: 'sent message to you',
      online: true,
    },
    {
      name: 'abc14',
      image: 'abc14.jpg',
      timeAt: '20:08',
      type: 'message',
      status: 'sent',
      msg: 'sent message to you',
      online: true,
    },
    {
      name: 'abc15',
      image: 'abc15.jpg',
      timeAt: '20:08',
      type: 'message',
      status: 'sent',
      msg: 'sent message to you',
      online: true,
    },
    {
      name: 'abc16',
      image: 'abc16.jpg',
      timeAt: '20:08',
      type: 'message',
      status: 'sent',
      msg: 'sent message to you',
      online: true,
    },
  ]

  isMinValueInit = true
  isMaxValueInit = true
  thumbLabel = true

  @Input() minValue: number
  @Input() maxValue: number
  @Input() minColor: ThemePalette = 'accent'
  @Input() maxColor: ThemePalette = 'accent'

  @Input() formatLabel = (v) => v

  @Output() output = new EventEmitter<RangeType>()

  maxConf = 80

  @Input()
  set max(m: number) {
    this.maxConf = parseInt(m.toString(), 10)
  }
  get max(): number {
    return this.maxConf
  }

  minConf = 18

  @Input()
  set min(m: number) {
    this.minConf = parseInt(m.toString(), 10)
  }
  get min(): number {
    return this.minConf
  }

  @Input()
  set value(v: { min: number; max: number }) {
    this.minValue = v.min
    this.maxValue = v.max
  }

  get rulerArray(): number[] {
    return [...Array(this.max - this.min).keys()].map((i) => i + this.min)
  }

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.matIconRegistry.addSvgIcon(
      'kiss-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/kiss-black.svg')
    )
    this.matIconRegistry.addSvgIcon(
      'male',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/male.svg')
    )
    this.matIconRegistry.addSvgIcon(
      'female',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/female.svg')
    )
  }

  ngOnInit(): void {
    if (!this.minValue) {
      this.minValue = this.min
    }
    if (!this.maxValue) {
      this.maxValue = this.max
    }
    this.isMinValueInit = this.minValue === this.min
    this.isMaxValueInit = this.maxValue === this.max
    this.output.emit({ min: this.minValue, max: this.maxValue })

    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.likesParam = 'Likers';

    this.userParams.gender = this.user?.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;

    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.authService.currentUser = user;
    }
  }

  changeGender(gender) {
    this.userParams.gender = gender;
  }

  getNotificationStyle() {
    let right = window.innerWidth / 2 - 700 > 5 ? window.innerWidth / 2 - 700 : 5
    let style = 'right:' + right + 'px;bottom:0px;'
    return style
  }

  valueChange(): void {
    this.output.emit({ min: this.minValue, max: this.maxValue })
  }

  minValueInput(a: MatSliderChange): void {
    this.isMinValueInit = a.value === this.min
    if (a.value >= this.maxValue) {
      a.source.value = this.maxValue
    }
  }

  maxValueInput(a: MatSliderChange): void {
    this.isMaxValueInit = a.value === this.max
    if (a.value <= this.minValue) {
      a.source.value = this.minValue
    }
  }

  loggedIn() {
    return this.authService.loggedIn()
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams).subscribe(
      (res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      },
      (error) => {
        error = error
      }
    )
  }
}
