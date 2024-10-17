import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatService } from 'src/app/_services/chat.service';

@Component({
  selector: 'app-chat-management',
  templateUrl: './chat-management.component.html',
  styleUrls: ['./chat-management.component.css']
})
export class ChatManagementComponent implements OnInit {

  chatList: Observable<any[]>
  transformArray: any[] = [];
  selectedUser: any
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.getChat()
  }

  getChat() {
    this.chatList = this.chatService.getUserMessages().valueChanges()
    this.chatList.subscribe(data => {
      data.forEach(obj => {
        Object.keys(obj).forEach(key => {
          const newObj = {
            userKey: obj[key].userKey,
            message: obj[key].message
          }
          this.transformArray.push(newObj)
        })
      })
    })
  }

  // getAllMessages(users) {
  //   const user = this.selectedUser
  //   this.chatList = this.chatService.getAllMessages(users, user)
  // }
}
