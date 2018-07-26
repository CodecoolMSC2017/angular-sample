import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { NewUser } from '../new-user';
import { PasswordChange } from '../password-change';
import { User } from '../user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;
  users: User[] = [];
  passwordChange: PasswordChange = new PasswordChange();
  newUser: NewUser = new NewUser();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(user => this.user = user);
  }

  deleteAuth() {
    this.authService.deleteAuth()
      .pipe(finalize(() => this.router.navigate(['login'])))
      .subscribe();
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  changePassword() {
    this.userService.changePassword(this.passwordChange).subscribe(console.log);
  }

  addUser() {
    this.userService.addUser(this.newUser).subscribe(console.log);
  }
}
