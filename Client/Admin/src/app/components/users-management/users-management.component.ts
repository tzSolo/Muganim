import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.dto';
import { DatePipe } from '@angular/common';
import { AddUserComponent } from "../add-user/add-user.component";
import { UserDetailsComponent } from "../user-details/user-details.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-management',
  imports: [DatePipe, AddUserComponent, UserDetailsComponent, RouterLink],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.css'
})
export class UsersManagementComponent implements OnInit {
  users: User[];
  showNewUserForm = false;
  userToEdit: User | undefined;
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
        //לדאוג שלא יחזור  כמה פעמים
        this.userService.getAllUsers().subscribe({
          next: (data) => {
            this.users = data;
          },
          error: (error) => console.error("can't get the users ", error)
        });
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
    const findUser = this.users.find((u) => u.id === id);
    if (findUser) {
      this.userToEdit = findUser;
    }
  }

  saveEditedUser(user: User) {
    if (this.userToEdit) {
      this.userService.updateUserById(this.userToEdit?.id, user).
        subscribe({
          next: () => {
            console.log("user updated succesfully");
            this.userToEdit = undefined;
            //לדאוג שלא יחזור  כמה פעמים
            this.userService.getAllUsers().subscribe({
              next: (data) => {
                this.users = data;
              },
              error: (error) => console.error("can't get the users ", error)
            });
          },
          error: (err) => console.error(err)
        })
    }
  }

  deleteUser(id: number) {
    this.userService.daleteUserById(id).subscribe({
      next: () => {
        console.log("user deleted succesfully")
        //לדאוג שלא יחזור  כמה פעמים
        this.userService.getAllUsers().subscribe({
          next: (data) => {
            this.users = data;
          },
          error: (error) => console.error("can't get the users ", error)
        });
      },
      error: (err) => console.error(err)
    })
  }
}
