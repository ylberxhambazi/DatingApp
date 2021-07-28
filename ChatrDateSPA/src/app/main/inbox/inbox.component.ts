import { Component, OnInit } from '@angular/core'
import { StreamTeaser } from 'src/app/interfaces'

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
})
export class InboxComponent implements OnInit {
  streamRecords: StreamTeaser[] = [
    {
      name: 'abc1',
      image: 'abc1.jpg',
      timeAt: '20:08',
      type: 'inbox',
      status: 'read',
      msg: 'Hi, I am interested in you',
      online: true,
    },
    {
      name: 'abc2',
      image: 'abc2.jpg',
      timeAt: '19:00',
      type: 'inbox',
      status: 'read',
      msg: 'Hi, I am interested in you',
      online: true,
    },
    {
      name: 'abc3',
      image: 'abc3.jpg',
      timeAt: '18:00',
      type: 'inbox',
      status: 'unread',
      msg: 'Hi, I am interested in you',
      online: true,
    },
    {
      name: 'abc4',
      image: 'abc4.jpg',
      timeAt: '17:08',
      type: 'inbox',
      status: 'unread',
      msg: 'Hi, I am interested in you',
      online: true,
    },
  ]

  constructor() {}

  ngOnInit(): void {}
}
