import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.dto';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-details',
  imports: [ReactiveFormsModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  @Input() user: User;
  @Output() onUserUpdate: EventEmitter<any> = new EventEmitter<any>();
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, Validators.required],
      password: [this.user.password, Validators.required],
      roleId: [this.user.roleId, Validators.required]
    });
  }

  onSubmit() {
    this.onUserUpdate.emit(this.formGroup.value);
  }
}
