import { Component, Input, OnInit } from '@angular/core'
import { StreamTeaser } from 'src/app/interfaces'

@Component({
  selector: 'app-stream-teaser',
  templateUrl: './stream-teaser.component.html',
  styleUrls: ['./stream-teaser.component.css'],
})
export class StreamTeaserComponent implements OnInit {
  @Input() stream: StreamTeaser

  constructor() {}

  ngOnInit(): void {}
  getImgSrc() {
    if (this.stream.image) {
      return './assets/images/user/' + this.stream.image
    }
  }
  getStreamTeaserClass() {
    var temp = ''
    if (this.stream.type == 'message' && this.stream.status == 'sent') {
      temp = ' message'
    } else if (this.stream.type == 'message' && this.stream.status == 'visit') {
      temp = ' profileView'
    } else if (this.stream.type == 'inbox' && this.stream.status == 'unread') {
      temp = ' unread'
    }
    return 'streamTeaser' + temp
  }
}
