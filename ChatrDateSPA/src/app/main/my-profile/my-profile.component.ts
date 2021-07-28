import { Component, HostListener, OnInit, Pipe, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { User } from 'src/app/_models/user'
import { AuthService } from 'src/app/_services/auth.service'
import { UserService } from 'src/app/_services/user.service'

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  @ViewChild('editForm', { static: true }) editForm: NgForm
  user: User;
  photoUrl: string;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true
    }
  }
  constructor(private userService: UserService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.user = data['user']
    });
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(
      (next) => {
        alert('Profile updated successfully')
        this.editForm.reset(this.user)
      },
      (error) => {
        error = error
      }
    )
  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }
}
