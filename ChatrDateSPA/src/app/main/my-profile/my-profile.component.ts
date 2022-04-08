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
  form: FormGroup;
  interests: Array<any> = [
    { id: 1, name: 'Dates', value: 'dates', selected: false },
    { id: 2, name: 'Flirts', value: 'flirts', selected: false },
    { id: 3, name: 'Chats', value: 'chats', selected: false },
    { id: 4, name: 'Friendship', value: 'friendship', selected: false },
    { id: 5, name: 'Acquaintance', value: 'acquaintance', selected: false }
  ];

  @ViewChild('editFacts', { static: true }) editFacts: NgForm
  @ViewChild('editHardFacts', { static: true }) editHardFacts: NgForm
  user: User;
  photoUrl: string;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editFacts.dirty) {
      $event.returnValue = true
    }
  }

  show: boolean = true;
  showPersonalInformation: boolean = true;

  birthDate

  constructor(private userService: UserService, private route: ActivatedRoute, private authService: AuthService, private formBuilder: FormBuilder, private alertify: AlertifyService, private datePipe: DatePipe) {
    this.form = this.formBuilder.group({
      interest: this.formBuilder.array([], [Validators.required])
    })
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.user = data['user']
    });
    this.birthDate = this.datePipe.transform(this.user.dateOfBirth, 'yyyy-MM-dd')
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(
      (next) => {
        this.alertify.success('Profile updated successfully')
        if (this.editFacts) {
          this.editFacts.reset(this.user)
          this.toggle()
        }
        if (this.editHardFacts) {
          this.editHardFacts.reset(this.user)
          this.togglePersonalInformation()
        }
      },
      (error) => {
        this.alertify.error(error)
      }
    )
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

  onCheckboxChange(e) {
    const interest: FormArray = this.form.get('interest') as FormArray;

    if (e.target.checked) {
      interest.push(new FormControl(e.target.value));
    }
    else {
      let i: number = 0;
      interest.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          interest.removeAt(i);
          return;
        }
        i++;
      })
      // const index = interest.controls.findIndex(x => x.value === e.target.value);
      // interest.removeAt(index);
    }
  }
}
