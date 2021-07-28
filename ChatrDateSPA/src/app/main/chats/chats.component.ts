import { Component, OnInit } from '@angular/core'
import { StreamTeaser } from 'src/app/interfaces'

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})
export class ChatsComponent implements OnInit {
  streamRecords: StreamTeaser[] = [
    {
      name: 'abc1',
      image: 'abc1.jpg',
      timeAt: '20:08',
      type: 'chats',
      status: '',
      msg: 'Hi, I am interested in you',
      online: true,
    },
    {
      name: 'abc2',
      image: 'abc2.jpg',
      timeAt: '19:00',
      type: 'chats',
      status: '',
      msg: 'Hi, I am interested in you',
      online: true,
    },
    {
      name: 'abc3',
      image: 'abc3.jpg',
      timeAt: '18:00',
      type: 'chats',
      status: '',
      msg: 'Hi, I am interested in you',
      online: true,
    },
    {
      name: 'abc4',
      image: 'abc4.jpg',
      timeAt: '17:08',
      type: 'chats',
      status: '',
      msg: 'Hi, I am interested in you',
      online: true,
    },
  ]
  constructor() {}

  ngOnInit(): void {}
}
