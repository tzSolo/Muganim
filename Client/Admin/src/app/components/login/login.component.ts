import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public formGroup: FormGroup;

  constructor(private router:Router, private formBuilder: FormBuilder, private authService: AuthService) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.authService.loginAdmin(this.formGroup.value).subscribe({
      next: response => {
        console.log(response);
        this.router.navigate(["/workspace"])
      },
      error: error => console.error('There was an error!', error)
    });
  }
}
