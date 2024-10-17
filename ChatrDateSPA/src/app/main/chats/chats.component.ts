import { Component, OnInit } from '@angular/core'
import { StreamTeaser } from 'src/app/interfaces'
import { User } from 'src/app/_models/user'
import { PaginatedResult, Pagination } from 'src/app/_models/pagination'
import { UserService } from 'src/app/_services/user.service'
import { ActivatedRoute } from '@angular/router'
import { ChatService } from 'src/app/_services/chat.service'
import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})
export class ChatsComponent implements OnInit {
  // streamRecords: StreamTeaser[] = [
  //   {
  //     name: 'abc1',
  //     image: 'abc1.jpg',
  //     timeAt: '20:08',
  //     type: 'chats',
  //     status: '',
  //     msg: 'Hi, I am interested in you',
  //     online: true,
  //   },
  //   {
  //     name: 'abc2',
  //     image: 'abc2.jpg',
  //     timeAt: '19:00',
  //     type: 'chats',
  //     status: '',
  //     msg: 'Hi, I am interested in you',
  //     online: true,
  //   },
  //   {
  //     name: 'abc3',
  //     image: 'abc3.jpg',
  //     timeAt: '18:00',
  //     type: 'chats',
  //     status: '',
  //     msg: 'Hi, I am interested in you',
  //     online: true,
  //   },
  //   {
  //     name: 'abc4',
  //     image: 'abc4.jpg',
  //     timeAt: '17:08',
  //     type: 'chats',
  //     status: '',
  //     msg: 'Hi, I am interested in you',
  //     online: true,
  //   },
  // ]

  users: User[]
  pagination: Pagination
  user: User = JSON.parse(localStorage.getItem('user'));
  messageList: any
  userList = []
  messageStream: StreamTeaser[];
  messageStreamLoaded: boolean = false;
  selectedNotificationType: string;
  showAllCities = 'showAllCities'

  constructor(private userService: UserService, private activeRoute: ActivatedRoute, private chatServices: ChatService) { }

  ngOnInit(): void {
    this.activeRoute.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    })
    const userTogether = this.users['username'] < this.user['username'] ? this.users['username'] + '_' + this.user['username'] : this.user['username'] + '_' + this.users['username']

    // if (userTogether)
    //   this.chatServices.getAllMessages(userTogether, this.user)

    this.selectedNotificationType = 'message';
    this.loadNotifications();
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe(
      (res: PaginatedResult<User[]>) => {
        this.users = res.result;
        if (this.selectedNotificationType === 'message') {
          this.messageStream = this.users.map((user) => ({
            image: user.photoUrl || '',
            type: 'message',
            timeAt: new Date().toISOString(),
            msg: 'sent message to you',
            name: user['username'] || 'Default Name',
            online: true,
            status: 'sent',
          }));
          this.messageStreamLoaded = true;
        }
        this.pagination = res.pagination;
      },
      (error) => {
        error.error
      }
    )
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadNotifications() {
    if (this.selectedNotificationType === 'message') {
      this.loadUsers();
    }
  }
}
