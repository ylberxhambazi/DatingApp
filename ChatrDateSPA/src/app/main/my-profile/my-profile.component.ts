import { DatePipe } from '@angular/common'
import { Component, HostListener, OnInit, Pipe, ViewChild } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { User } from 'src/app/_models/user'
import { AlertifyService } from 'src/app/_services/alertify.service'
import { AuthService } from 'src/app/_services/auth.service'
import { UserService } from 'src/app/_services/user.service'

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  interests = [
    { id: 1, name: 'Dates', value: 'dates', selected: false },
    { id: 2, name: 'Flirts', value: 'flirts', selected: false },
    { id: 3, name: 'Chats', value: 'chats', selected: false },
    { id: 4, name: 'Friendship', value: 'friendship', selected: false },
    { id: 5, name: 'Acquaintance', value: 'acquaintance', selected: false }
  ];

  get selectedOptions() {
    return this.interests.filter(opt => opt.selected).map(opt => opt.value);
  }

  @ViewChild('editFacts', { static: true }) editFacts: NgForm
  @ViewChild('editHardFacts', { static: true }) editHardFacts: NgForm
  @ViewChild('editAboutInfo', { static: true }) editAboutInfo: NgForm

  user: User;
  photoUrl: string;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editFacts.dirty || this.editHardFacts.dirty || this.editAboutInfo.dirty) {
      $event.returnValue = true
    }
  }

  selectedInterests: string[] = [];
  show: boolean = true;
  showPersonalInformation: boolean = true;
  showAboutInfo: boolean = true;

  constructor(private userService: UserService, private route: ActivatedRoute, private authService: AuthService, private formBuilder: FormBuilder, private alertify: AlertifyService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.user = data['user'];
      this.initializeInterestsSelection();
    });
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  initializeInterestsSelection() {
    for (const webInterest of this.interests) {
      webInterest.selected = this.user.interests.includes(webInterest.value);
    }
  }

  updateUser() {
    this.user.interests = this.selectedInterests.join(',');

    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(
      (next) => {
        if (JSON.stringify(this.editFacts.value) === JSON.stringify(this.user)) {
          this.alertify.warning('No changes were made.');
        } else {
          this.alertify.success('Profile updated successfully');
        }
        setTimeout(() => {
          this.editFacts?.reset(this.user);
        }, 200);
        this.toggle();
      },
      (error) => {
        if (error.status === 500 && error.error === "Updating user failed. Check for duplicate values.") {
          this.alertify.warning('Duplicate values detected. Please check your input.');
        } else {
          this.alertify.error(error);
        }
      }
    );
  }

  updatePersonalInfo() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(
      (next) => {
        if (JSON.stringify(this.editHardFacts.value) === JSON.stringify(this.user)) {
          this.alertify.warning('No changes were made.');
        } else {
          this.alertify.success('Profile updated successfully');
        }
        this.editHardFacts?.reset(this.user);
        this.togglePersonalInformation();
      },
      (error) => {
        if (error.status === 500 && error.error === "Updating user failed. Check for duplicate values.") {
          this.alertify.warning('Duplicate values detected. Please check your input.');
        } else {
          this.alertify.error(error);
        }
      }
    );
  }

  updateUserAbout() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(
      (next) => {
        if (JSON.stringify(this.editFacts.value) === JSON.stringify(this.user)) {
          this.alertify.warning('No changes were made.');
        } else {
          this.alertify.success('Profile updated successfully');
        }
        this.editFacts?.reset(this.user);
        this.toggleAboutInfo();
      },
      (error) => {
        if (error.status === 500 && error.error === "Updating user failed. Check for duplicate values.") {
          this.alertify.warning('Duplicate values detected. Please check your input.');
        } else {
          this.alertify.error(error);
        }
      }
    );
  }

  updateSelectedInterests(interest: string, isChecked: boolean) {
    if (isChecked) {
      // Add the interest to the selectedInterests array if checked
      this.selectedInterests.push(interest);
    } else {
      // Remove the interest if unchecked
      const index = this.selectedInterests.indexOf(interest);
      if (index !== -1) {
        this.selectedInterests.splice(index, 1);
      }
    }
  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }

  toggle() {
    this.show = !this.show;
  }

  togglePersonalInformation() {
    this.showPersonalInformation = !this.showPersonalInformation;
  }

  toggleAboutInfo() {
    this.showAboutInfo = !this.showAboutInfo;
  }

  getUsername() {
    return this.user['username']
  }
}
