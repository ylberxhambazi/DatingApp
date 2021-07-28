import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  @Input() title: string
  @Input() content: string
  @Input() imgSrc: string
  @Input() imgPosition: string

  constructor() {}

  ngOnInit(): void {}

  getArticleClass() {
    return 'article ' + this.imgPosition
  }

  getImgClass() {
    return 'mood ' + this.imgPosition
  }

  getImgSrc() {
    if (this.imgSrc) {
      return './assets/images/articles/' + this.imgSrc
    }
  }
}
