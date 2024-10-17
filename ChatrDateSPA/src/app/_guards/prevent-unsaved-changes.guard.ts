import { Injectable } from '@angular/core'
import { CanDeactivate } from '@angular/router'
import { MyProfileComponent } from '../main/my-profile/my-profile.component'

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MyProfileComponent> {
  canDeactivate(component: MyProfileComponent) {
    if ((component.editFacts && component.editFacts.dirty) || (component.editHardFacts && component.editHardFacts.dirty) || (component.editAboutInfo && component.editAboutInfo.dirty)) {
      return confirm('Are you sure you want to continue? Any unsaved changes will be lost')
    }
    return true
  }
}
