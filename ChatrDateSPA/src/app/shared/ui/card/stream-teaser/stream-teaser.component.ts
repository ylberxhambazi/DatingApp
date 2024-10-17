import { Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { StreamTeaser } from 'src/app/interfaces'
import { User } from 'src/app/_models/user'
import { ChatService } from 'src/app/_services/chat.service'

@Component({
  selector: 'app-stream-teaser',
  templateUrl: './stream-teaser.component.html',
  styleUrls: ['./stream-teaser.component.css'],
})
export class StreamTeaserComponent implements OnInit {
  @Input() users: User
  @Input() likesUsers: User;
  @Input() favoritesUsers: User;
  @Input() visitorsUsers: User;
  @Input() stream: StreamTeaser[];
  @Input() selectedNotificationType: string;

  chatList: any
  selectedUser: any
  user: User = JSON.parse(localStorage.getItem('user'));
  showMessages: boolean = true;
  showLikes: boolean = true;
  showFavorites: boolean = true;
  showVisitors: boolean = true;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    const userTogether = this.users['username'] < this.user['username'] ? this.users['username'] + '_' + this.user['username'] : this.user['username'] + '_' + this.users['username']
    const userAllChat = this.users['username'] + '_' + this.user['username']

    if (userAllChat)
      this.getChat(userAllChat)
    if (userTogether)
      this.getAllMessages(userTogether)
  }

  getChat(user) {
    this.selectedUser = user;
    this.chatService.getMessagesId(user).subscribe(messages => {
      if (messages) {
        Object.keys(messages).map(key => { messages[key]['userKey'] });
      }
    });
  }

  getAllMessages(users) {
    const user = this.selectedUser
    this.chatList = this.chatService.getAllMessages(users, user)
  }

  getImgSrc() {
    if (this.users.photoUrl) {
      return this.users.photoUrl
    }
  }

  getStreamTeaserClass() {
    var temp = '';

    if (this.stream && this.stream.length > 0) {
      const firstItem = this.stream[0];

      if (firstItem.type === 'message') {
        temp = ' message';
      } else if (firstItem.type === 'like') {
        temp = ' like';
      } else if (firstItem.type === 'kiss') {
        temp = ' kiss';
      } else if (firstItem.type === 'profileVisit') {
        temp = ' profileVisit';
      }
    }
    return 'streamTeaser' + temp;
  }

  closeMessages() {
    this.showMessages = false;
  }

  closeLikes() {
    this.showLikes = false;
  }

  closeFavorites() {
    this.showFavorites = false;
  }

  closeVisitor() {
    this.showVisitors = false;
  }
}
