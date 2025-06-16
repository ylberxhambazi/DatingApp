import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { ChatService } from 'src/app/_services/chat.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
    selector: 'app-chat-management',
    templateUrl: './chat-management.component.html',
    styleUrls: ['./chat-management.component.css']
})
export class ChatManagementComponent implements OnInit {
    @ViewChild('scrollAnchor') scrollAnchor!: ElementRef;
    conversations$: Observable<any[]>;
    messages$: Observable<any[]>;
    typingUsers$: Observable<string[]>;
    selectedConversationId: string;
    selectedParticipants: string[] = [];
    selectedSender: string;
    messageText: string = '';
    userStatuses: { [username: string]: string } = {};
    searchText: string = '';
    allConversations: any[] = [];
    filteredConversations: any[] = [];

    constructor(private chatService: ChatService, private db: AngularFireDatabase) { }

    ngAfterViewInit() {
        this.scrollToBottom();
    }

    ngOnInit(): void {
        this.chatService.getAllConversations().subscribe(convos => {
            this.allConversations = convos;
            this.filteredConversations = convos;
        });
    }

    filterConversations(): void {
        const text = this.searchText.toLowerCase();
        this.filteredConversations = this.allConversations.filter(convo =>
            convo.participants.some(p => p.toLowerCase().includes(text))
        );
    }

    scrollToBottom(): void {
        try {
            this.scrollAnchor.nativeElement.scrollIntoView({ behavior: 'smooth' });
        } catch (err) {
            console.error('Scroll failed:', err);
        }
    }

    selectConversation(convoId: string, participants: string[]): void {
        this.selectedConversationId = convoId;
        this.selectedParticipants = participants;
        this.selectedSender = participants[1];

        this.messages$ = this.chatService.loadMessages(convoId);

        // Scroll on message load
        this.messages$.subscribe(() => {
            setTimeout(() => this.scrollToBottom(), 0);
        });

        this.typingUsers$ = this.chatService.getTypingUsers(convoId);

        participants.forEach(username => {
            this.chatService.getPresences(username).subscribe(status => {
                this.userStatuses[username] = status?.status || 'offline';
            });
        });
    }

    sendMessage(): void {
        const receiver = this.selectedParticipants.find(p => p !== this.selectedSender);
        this.chatService.sendMessageAs(
            this.selectedConversationId,
            this.selectedSender,
            receiver,
            this.messageText
        )
        this.messageText = '';
        this.chatService.setTyping(this.selectedConversationId, this.selectedSender, false);
    }

    onTyping(): void {
        this.chatService.setTyping(this.selectedConversationId, this.selectedSender, true);
    }

    getStatusColor(username: string): string {
        const status = this.userStatuses[username];
        switch (status) {
            case 'online': return 'text-green-500';
            case 'away': return 'text-yellow-500';
            default: return 'text-gray-400';
        }
    }
}