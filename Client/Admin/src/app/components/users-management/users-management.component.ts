import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { DatePipe } from '@angular/common';
import { AddUserComponent } from "../add-user/add-user.component";

@Component({
  selector: 'app-users-management',
  imports: [DatePipe, AddUserComponent],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.css'
})
export class UsersManagementComponent implements OnInit {
  users: User[];
  showNewUserForm = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (data) => this.users = data,
      error: (error) => console.error("can't get the users ", error)
    });
  }

  addUser() {

  }

  openNewUserForm() {
    this.showNewUserForm = true;
  }
}
