import { Component, OnInit } from '@angular/core'
import { ProfileTeaser } from 'src/app/interfaces'

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css'],
})
export class LikesComponent implements OnInit {
  profileRecords: ProfileTeaser[] = [
    {
      name: 'abc1',
      image: ['abc1.jpg', 'abc2.jpg', 'abc3.jpg'],
      online: false,
      age: 20,
      address: 'add1',
    },
    {
      name: 'abc2',
      image: ['abc2.jpg', 'abc2.jpg', 'abc2.jpg'],
      online: true,
      age: 20,
      address: 'add1',
    },
    {
      name: 'abc3',
      image: ['abc3.jpg', 'abc3.jpg', 'abc3.jpg'],
      online: true,
      age: 20,
      address: 'add1',
    },
    {
      name: 'abc4',
      image: ['abc4.jpg'],
      online: true,
      age: 20,
      address: 'add1',
    },
    {
      name: 'abc5',
      image: ['abc5.jpg'],
      online: true,
      age: 20,
      address: 'add1',
    },
    {
      name: 'abc6',
      image: ['abc6.jpg'],
      online: true,
      age: 20,
      address: 'add1',
    },
    {
      name: 'abc7',
      image: ['abc7.jpg'],
      online: true,
      age: 20,
      address: 'add1',
    },
    {
      name: 'abc8',
      image: ['abc8.jpg'],
      online: true,
      age: 20,
      address: 'add1',
    },
    {
      name: 'abc9',
      image: ['abc9.jpg'],
      online: true,
      age: 20,
      address: 'add1',
    },
    {
      name: 'abc10',
      image: ['abc10.jpg'],
      online: true,
      age: 20,
      address: 'add1',
    },
    {
      name: 'abc11',
      image: ['abc11.jpg'],
      online: true,
      age: 20,
      address: 'add1',
    },
    {
      name: 'abc12',
      image: ['abc12.jpg'],
      online: true,
      age: 20,
      address: 'add1',
    },
    {
      name: 'abc13',
      image: ['abc13.jpg'],
      online: true,
      age: 20,
      address: 'add1',
    },
    {
      name: 'abc14',
      image: ['abc14.jpg'],
      online: true,
      age: 20,
      address: 'add1',
    },
    {
      name: 'abc15',
      image: ['abc15.jpg'],
      online: true,
      age: 20,
      address: 'add1',
    },
    {
      name: 'abc16',
      image: ['abc16.jpg'],
      online: true,
      age: 20,
      address: 'add1',
    },
    {
      name: 'abc17',
      image: ['abc1.jpg'],
      online: true,
      age: 20,
      address: 'add1',
    },
    {
      name: 'abc18',
      image: ['abc2.jpg'],
      online: true,
      age: 20,
      address: 'add1',
    },
    {
      name: 'abc19',
      image: ['abc3.jpg'],
      online: true,
      age: 20,
      address: 'add1',
    },
    {
      name: 'abc20',
      image: ['abc4.jpg'],
      online: true,
      age: 20,
      address: 'add1',
    },
    {
      name: 'abc21',
      image: ['abc5.jpg'],
      online: true,
      age: 20,
      address: 'add1',
    },
    {
      name: 'abc22',
      image: ['abc6.jpg'],
      online: true,
      age: 20,
      address: 'add1',
    },
    {
      name: 'abc23',
      image: ['abc7.jpg'],
      online: true,
      age: 20,
      address: 'add1',
    },
    {
      name: 'abc24',
      image: ['abc8.jpg'],
      online: true,
      age: 20,
      address: 'add1',
    },
  ]
  ProfileType: string = 'private'

  breakpoint: number

  constructor() {}

  ngOnInit(): void {
    this.breakpoint = 4
    this.onUpdateGridColumn()
  }
  onResize(event) {
    this.onUpdateGridColumn()
  }

  onUpdateGridColumn() {
    if (window.innerWidth >= 1024) {
      this.breakpoint = 4
    } else {
      this.breakpoint = 2
    }
  }
}
