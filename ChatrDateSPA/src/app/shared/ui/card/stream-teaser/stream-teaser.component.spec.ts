import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StreamTeaserComponent } from './stream-teaser.component'

describe('StreamTeaserComponent', () => {
  let component: StreamTeaserComponent
  let fixture: ComponentFixture<StreamTeaserComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StreamTeaserComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamTeaserComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
