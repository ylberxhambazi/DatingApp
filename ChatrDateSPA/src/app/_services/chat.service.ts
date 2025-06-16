import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { User } from '../_models/user';
import { Observable, of } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    user: User = JSON.parse(localStorage.getItem('user'));
    messageList: AngularFireList<any>
    roomList: AngularFireList<any>
    messageChat: Observable<any[]>;
    presenceList: AngularFireObject<any>
    presence: Observable<any>
    users
    userAuth

    constructor(private authService: AuthService, private db: AngularFireDatabase, private afAuth: AngularFireAuth, private http: HttpClient) {
        this.roomList = db.list('/datingappchat/conversations/', ref => { return ref.orderByChild('timestamp') });
        this.updateOnUser().subscribe()
        this.updateOnDisconnect().subscribe()
        this.updateOnAway()
    }

    getUserMessages(): AngularFireList<any> {
        return this.roomList;
    }

    getMessage(user) {
        return this.db.list('datingappchat/conversations/' + user, ref => { return ref.orderByChild('timestamp') }).valueChanges()
    }

    getMessagesId(userID) {
        return this.db.object('datingappchat/conversations/' + userID).valueChanges();
    }

    getMessagesList(userName) {
        this.messageList = this.db.list('datingappchat/conversations/' + userName)
        return this.messageList.valueChanges()
    }

    getAllMessages(userName, user) {
        this.messageList = this.db.list(`datingappchat/conversations/${userName}`, ref => ref.orderByChild('userKey').startAt(userName).endAt(user).limitToLast(1))
        return this.messageList.valueChanges()
    }

    getAllConversations() {
        return this.db.list('datingappchat/conversations').snapshotChanges().pipe(
            map(actions =>
                actions
                    .map(a => {
                        const messagesObj = a.payload.val() as { [key: string]: any };
                        const messages = messagesObj ? Object.values(messagesObj) : [];

                        const sortedMessages = messages
                            .filter(m => m?.timeSent)
                            .sort((a: any, b: any) => b.timeSent - a.timeSent);

                        const latestMessage = sortedMessages[0] || null;
                        const participants = this.extractParticipants(messages);

                        const unreadCount = messages.filter(
                            (m: any) => !m.seen && m.userReceived
                        ).length;

                        return {
                            id: a.key,
                            participants,
                            latestMessage,
                            unreadCount
                        };
                    })
                    .sort((a, b) => {
                        const aTime = a.latestMessage?.timeSent || 0;
                        const bTime = b.latestMessage?.timeSent || 0;
                        return bTime - aTime;
                    })
            )
        );
    }



    loadMessages(convoId: string): Observable<any[]> {
        return this.db.list(`datingappchat/conversations/${convoId}`, ref =>
            ref.orderByChild('timeSent')
        ).valueChanges().pipe(
            map(messages => messages.sort((a: any, b: any) => a.timeSent - b.timeSent))
        );
    }

    sendMessageAs(convoId: string, sender: string, receiver: string, message: string) {
        const timestamp = Date.now();
        const messageData = {
            message,
            userName: sender,
            userReceived: receiver,
            timeSent: timestamp,
            seen: false,
            userKey: `${sender}_${receiver}`
        };
        return this.db.list(`datingappchat/conversations/${convoId}`).push(messageData);
    }

    setTyping(convoId: string, username: string, isTyping: boolean) {
        return this.db.object(`typing/${convoId}/${username}`).set(isTyping);
    }

    getTypingUsers(convoId: string): Observable<string[]> {
        return this.db.object(`typing/${convoId}`).valueChanges().pipe(
            map((typingObj: any) =>
                typingObj
                    ? Object.keys(typingObj).filter(username => typingObj[username])
                    : []
            )
        );
    }

    setPresence(username: string, status: 'online' | 'offline' | 'away') {
        return this.db.object(`presence/${username}`).set({ status });
    }

    getPresences(username: string): Observable<any> {
        return this.db.object(`presence/${username}`).valueChanges();
    }

    private extractParticipants(messages: any): string[] {
        const participants = new Set<string>();
        if (Array.isArray(messages)) {
            messages.forEach(msg => {
                if (msg?.userName) participants.add(msg.userName);
                if (msg?.userReceived) participants.add(msg.userReceived);
            });
        } else if (typeof messages === 'object') {
            Object.values(messages).forEach((msg: any) => {
                if (msg?.userName) participants.add(msg.userName);
                if (msg?.userReceived) participants.add(msg.userReceived);
            });
        }
        return Array.from(participants);
    }

    sendMessage(user, messageBody, chatID, usersKey) {
        const timestamp = this.getTimeStamp()
        const currentUser = this.authService.currentUser;
        const messageData = {
            message: messageBody,
            timeSent: timestamp,
            userReceived: this.authService.currentUser['username'],
            idSent: this.authService.decodedToken.nameid,
            userName: user['username'],
            photoUrl: this.user.photoUrl,
            seen: false,
            userKey: usersKey
        }
        this.db.list(`datingappchat/conversations/${chatID}`).push(messageData)
    }

    updateSeenStatus(conversationId: string) {
        const loggedInUsername = this.authService.currentUser['username'];

        this.db.list(`datingappchat/conversations/${conversationId}`).query.ref
            .once('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const message = childSnapshot.val();
                    if (message.userReceived === loggedInUsername) {
                        childSnapshot.ref.update({ seen: true });
                    }
                });
            });
    }

    getTimeStamp() {
        const now = new Date();
        const date = now.getFullYear() + '/' +
            (now.getMonth() + 1) + '/' +
            now.getDate();
        const time = now.getHours() + ':' +
            now.getMinutes() + ':' +
            now.getSeconds();

        return (date + ' ' + time);
    }

    getPresence(user) {
        return this.db.object(`datingappchat/presence/${user}`).valueChanges().pipe(first())
    }

    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user).username : null;
    }

    async setPersistence(status: string) {
        const user = await this.getUser()
        const timestamp = this.getTimeStamp()
        if (user) {
            return this.db.object(`datingappchat/presence/${user}`).update({ status, timeStamp: timestamp })
        }
    }

    updateOnUser() {
        const connection = this.db.object('.info/connected').valueChanges().pipe(
            map((connected) => connected ? 'online' : 'offline')
        );

        return this.afAuth.authState.pipe(
            switchMap((user) => (user ? connection : of('offline'))),
            tap((status) => this.setPersistence(status))
        )
    }

    updateOnDisconnect() {
        const timestamp = this.getTimeStamp()
        return this.db.object(`datingappchat/presence/${this.authService.currentUser['username']}`).snapshotChanges().pipe(
            tap(user => {
                if (user) {
                    this.db.object(`datingappchat/presence/${user.key}`).query.ref.onDisconnect()
                        .update({
                            status: 'offline',
                            timeStamp: timestamp
                        })
                }
            })
        )
    }

    async signOut() {
        await this.setPersistence('offline')
        return this.afAuth.signOut()
    }

    updateOnAway() {
        document.onvisibilitychange = (e) => {
            if (document.visibilityState === 'hidden') {
                this.setPersistence('away')
            } else {
                this.setPersistence('online')
            }
        }
    }
}
