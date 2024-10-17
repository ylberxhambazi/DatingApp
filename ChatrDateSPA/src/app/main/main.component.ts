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
  visitorParam: string;
  favoritesParam: string;
  selectedNotificationType: string;
  likesUsers: User[];
  favoritesUsers: User[];
  visitorsUsers: User[];

  messageStream: StreamTeaser[];
  likeStream: StreamTeaser[];
  kissStream: StreamTeaser[];
  profileVisitStream: StreamTeaser[];

  messageStreamLoaded: boolean = false;
  likeStreamLoaded: boolean = false;
  kissStreamLoaded: boolean = false;
  profileVisitStreamLoaded: boolean = false;

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
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });

    this.likesParam = 'Likers';
    this.favoritesParam = 'FavoritsActives'

    this.userParams.gender = this.user?.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.city = '';

    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.authService.currentUser = user;
    }

    this.selectedNotificationType = 'message';
    this.loadNotifications();
  }

  changeGender(gender) {
    this.userParams.gender = gender;
  }

  getNotificationStyle() {
    let right = window.innerWidth / 2 - 700 > 5 ? window.innerWidth / 2 - 700 : 5
    let style = 'right:' + right + 'px;bottom:0px;'
    return style
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
        if (this.selectedNotificationType === 'message') {
          this.users;
        }
        this.pagination = res.pagination;
      },
      (error) => {
        error = error
      }
    )
  }

  loadLike() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam).subscribe(
      (res: PaginatedResult<User[]>) => {
        this.likesUsers = res.result;
        this.likeStream = this.likesUsers.map((user) => ({
          image: user.photoUrl || '',
          type: 'like',
          timeAt: new Date().toISOString(),
          msg: 'liked your profile',
          name: user['username'] || 'Default Name',
          online: true,
          status: 'liked'
        }));
        this.likeStreamLoaded = true;
        this.pagination = res.pagination;
      })
  }

  loadFavorite() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, null, this.favoritesParam).subscribe(
      (res: PaginatedResult<User[]>) => {
        this.favoritesUsers = res.result;
        this.kissStream = this.favoritesUsers.map((user) => ({
          image: user.photoUrl || '',
          type: 'kiss',
          timeAt: new Date().toISOString(),
          msg: 'favorited your profile',
          name: user['username'] || 'Default Name',
          online: true,
          status: 'favorited'
        }));
        this.kissStreamLoaded = true;
        this.pagination = res.pagination;
      })
  }

  loadVisitor() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, null, null, this.visitorParam).subscribe(
      (res: PaginatedResult<User[]>) => {
        this.visitorsUsers = res.result;
        this.profileVisitStream = this.visitorsUsers.map((user) => ({
          image: user.photoUrl || '',
          type: 'profileVisit',
          timeAt: new Date().toISOString(),
          msg: 'has visited your profile',
          name: user['username'] || 'Default Name',
          online: true,
          status: 'visit'
        }));
        this.profileVisitStreamLoaded = true;
        this.pagination = res.pagination;
      })
  }

  changeNotificationType(type: string) {
    this.selectedNotificationType = type;
    this.loadNotifications(); // Load notifications when the notification type changes
  }

  loadNotifications() {
    switch (this.selectedNotificationType) {
      case 'message':
        if (!this.messageStreamLoaded) {
          this.loadUsers();
        }
        break;
      case 'like':
        this.likesParam = 'Likers';
        if (!this.likeStreamLoaded) {
          this.loadLike();
        }
        break;
      case 'kiss':
        this.favoritesParam = 'FavoritsActives';
        if (!this.kissStreamLoaded) {
          this.loadFavorite();
        }
        break;
      case 'profileVisit':
        this.visitorParam = 'VisitorCount';
        if (!this.profileVisitStreamLoaded) {
          this.loadVisitor();
        }
        break;
      default:
        console.error('Invalid notification type');
        break;
    }
  }
}
