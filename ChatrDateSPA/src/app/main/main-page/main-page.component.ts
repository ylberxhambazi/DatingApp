import { Component, OnInit } from '@angular/core'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { PaginatedResult, Pagination } from 'src/app/_models/pagination'
import { User } from 'src/app/_models/user'
import { AuthService } from 'src/app/_services/auth.service'
import { ChatService } from 'src/app/_services/chat.service'
import { UserService } from 'src/app/_services/user.service'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  // profileRecords: ProfileTeaser[] = [
  //   { name: "abc1", image: ["abc1.jpg", "abc2.jpg", "abc3.jpg"], online: false, age: 20, address: "add1" },
  //   { name: "abc2", image: ["abc2.jpg", "abc2.jpg", "abc2.jpg"], online: true, age: 20, address: "add1" },
  //   { name: "abc3", image: ["abc3.jpg", "abc3.jpg", "abc3.jpg"], online: true, age: 20, address: "add1" },
  //   { name: "abc4", image: ["abc4.jpg"], online: true, age: 20, address: "add1" },
  //   { name: "abc5", image: ["abc5.jpg"], online: true, age: 20, address: "add1" },
  //   { name: "abc6", image: ["abc6.jpg"], online: true, age: 20, address: "add1" },
  //   { name: "abc7", image: ["abc7.jpg"], online: true, age: 20, address: "add1" },
  //   { name: "abc8", image: ["abc8.jpg"], online: true, age: 20, address: "add1" },
  //   { name: "abc9", image: ["abc9.jpg"], online: true, age: 20, address: "add1" },
  //   { name: "abc10", image: ["abc10.jpg"], online: true, age: 20, address: "add1" },
  //   { name: "abc11", image: ["abc11.jpg"], online: true, age: 20, address: "add1" },
  //   { name: "abc12", image: ["abc12.jpg"], online: true, age: 20, address: "add1" },
  //   { name: "abc13", image: ["abc13.jpg"], online: true, age: 20, address: "add1" },
  //   { name: "abc14", image: ["abc14.jpg"], online: true, age: 20, address: "add1" },
  //   { name: "abc15", image: ["abc15.jpg"], online: true, age: 20, address: "add1" },
  //   { name: "abc16", image: ["abc16.jpg"], online: true, age: 20, address: "add1" },
  //   { name: "abc17", image: ["abc1.jpg"], online: true, age: 20, address: "add1" },
  //   { name: "abc18", image: ["abc2.jpg"], online: true, age: 20, address: "add1" },
  //   { name: "abc19", image: ["abc3.jpg"], online: true, age: 20, address: "add1" },
  //   { name: "abc20", image: ["abc4.jpg"], online: true, age: 20, address: "add1" },
  //   { name: "abc21", image: ["abc5.jpg"], online: true, age: 20, address: "add1" },
  //   { name: "abc22", image: ["abc6.jpg"], online: true, age: 20, address: "add1" },
  //   { name: "abc23", image: ["abc7.jpg"], online: true, age: 20, address: "add1" },
  //   { name: "abc24", image: ["abc8.jpg"], online: true, age: 20, address: "add1" },
  // ]
  users: User[]
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{ value: 'male', name: 'Males' }, { value: 'female', name: 'Females' }];
  userParams: any = {};
  pagination: Pagination;
  ProfileType: string = 'private'
  breakpoint: number
  likesParam: string
  location = {}

  constructor(private userServices: UserService, private route: ActivatedRoute, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private authService: AuthService, private chatService: ChatService) {
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
    this.breakpoint = 4
    this.onUpdateGridColumn()
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    })

    this.getLocationAndSetCity();

    this.likesParam = 'Likers';

    this.userParams.gender = this.user?.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.city ? this.userParams.city : 'Unknown';

    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.authService.currentUser = user;
    }
  }

  private getLocationAndSetCity(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.location = position.coords;
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        let mapUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`

        fetch(mapUrl)
          .then(res => res.json())
          .then((out) => {
            this.userParams.city = out.city;
          })
          .catch(err => { throw err })
      });
    }
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  onResize(event) {
    this.onUpdateGridColumn()
  }

  onUpdateGridColumn() {
    if (window.innerWidth >= 1024) {
      this.breakpoint = 4
    } else if (window.innerWidth >= 900) {
      this.breakpoint = 3
    } else if (window.innerWidth <= 768) {
      this.breakpoint = 2
    }
  }

  changeGender(gender) {
    this.userParams.gender = gender;
  }

  loadUsers() {
    this.userServices.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams).subscribe(
      (res: PaginatedResult<User[]>) => {
        this.users = res.result;
        console.log(this.users)
        this.pagination = res.pagination;
      },
      (error) => {
        error = error
      }
    )
  }

  cityValue() {
    this.getLocationAndSetCity();
  }
}
