import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  changeEmail = false;
  deleteProfile = false;
  emailNotifications = false;
  changeDateofbirth = false
  changeGender = false;
  uploadPhotos = false;
  requirementsPhotos = false;
  displayPhotos = false;
  paymentsWork = false;
  purchasingCredits = false;
  purchaseNotCredited = false;
  fakeProfiles = false;
  personalData = false;


  constructor() { }

  ngOnInit(): void {
  }

}
