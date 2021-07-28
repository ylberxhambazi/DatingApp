import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProfileTeaserComponent } from './profile-teaser.component'

describe('ProfileTeaserComponent', () => {
  let component: ProfileTeaserComponent
  let fixture: ComponentFixture<ProfileTeaserComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileTeaserComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTeaserComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
