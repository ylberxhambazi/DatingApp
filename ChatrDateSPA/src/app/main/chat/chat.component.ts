import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { User } from 'src/app/_models/user'
import { ChatService } from 'src/app/_services/chat.service'
import { ChatMessage } from 'src/app/_models/chat-message'
import { map } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  @ViewChild('scroller') private chatContainer: ElementRef
  @Input() user: User
  messageList: any
  selectedUser: any
  newMsg: string = ""
  users: User = JSON.parse(localStorage.getItem('user'));
  presence$
  sendMessageUser
  userTogether

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private chatService: ChatService, private route: ActivatedRoute, private afAuth: AngularFireAuth) {
    this.matIconRegistry.addSvgIcon(
      'kiss-icon-red',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/kiss.svg')
    )

  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.userTogether = this.user['username'] < this.users['username'] ? this.user['username'] + '_' + this.users['username'] : this.users['username'] + '_' + this.user['username']
    this.getChat(this.userTogether)

    this.messageList = this.chatService.getMessagesList(this.userTogether)
    this.presence$ = this.chatService.getPresence(this.user['username'])
    this.chatService.updateSeenStatus(this.userTogether);
  }

  ngOnChanges() {
    this.messageList = this.chatService.getMessagesList(this.userTogether)
  }

  getChat(user) {
    this.selectedUser = user;
    this.chatService.getMessagesId(user).subscribe(messages => {
      if (messages) {
        Object.keys(messages).map(key => {
          messages[key]['seen'] = true;
        });
      }
    });
  }

  newMessage() {
    this.sendMessageUser = this.users['username'] + '_' + this.user['username']
    this.chatService.sendMessage(this.user, this.newMsg, this.selectedUser, this.sendMessageUser)
    if (this.newMsg !== null)
      this.newMsg = ''
  }

  handleSubmit(event) {
    if (event.keyCode === 'ENTER') {
      this.newMessage()
    }
  }

  scrollToBottom() {
    this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight
  }

  ngAfterViewChecked() {
    this.scrollToBottom()
  }
}
