import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      roleId: [1, Validators.required]
    });
  }

  onSubmit() {
    this.userService.addUser(this.formGroup.value).
      subscribe(
        (response) => console.log(response)
      );
  }
}
