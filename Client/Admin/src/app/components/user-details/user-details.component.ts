import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.dto';

@Component({
  selector: 'app-user-details',
  imports: [ReactiveFormsModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  @Input() user: User
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, Validators.required],
      password: [this.user.password, Validators.required],
      roleId: [this.user.roleId, Validators.required]
    });
  }

  onSubmit() {

  } 
}
