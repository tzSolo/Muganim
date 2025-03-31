import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.dto';
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

  addUser(user: any) {
    this.userService.addUser(user).subscribe({
      next: () => {
        this.showNewUserForm = false;
      },
      error: (error) => {
        console.error("can't register new user ", error)
      }
    });
  }

  openNewUserForm() {
    this.showNewUserForm = true;
  }

  editUser(id: number) {
    const userToEdit = this.users.find((u) => u.id === id);
    if (userToEdit)
      userToEdit.canBeEdit = true;
  }
  
  deleteUser(id: number) {
    this.userService.daleteUserById(id).subscribe({
      next: () => console.log("user deleted succesfully"),
      error: (err) => console.error(err)
    })
  }
}
