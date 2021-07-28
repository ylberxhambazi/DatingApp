import { Component, OnInit } from '@angular/core'
import { ProfileTeaser } from 'src/app/interfaces'

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favoriteRecords: ProfileTeaser[] = [
    {
      name: 'abc4',
      image: ['abc4.jpg'],
      online: true,
      age: 20,
      address: 'add1',
    },
  ]
  searchRecords: ProfileTeaser[] = [
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
