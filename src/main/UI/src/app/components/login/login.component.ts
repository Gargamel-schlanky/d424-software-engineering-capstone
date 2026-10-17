import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../app.component.css']
})
export class LoginComponent implements OnInit {

  hasAdminAccount: boolean = true;
  loginForm!: FormGroup;
  registerAdminForm!: FormGroup;

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/intake']);
      return;
    }

    this.loginForm = new FormGroup({
      username: new FormControl('administrator', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.registerAdminForm = new FormGroup({
      username: new FormControl('administrator'),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirmPassword: new FormControl('', Validators.required)
    });

    this.checkAdminStatus();
  }

  checkAdminStatus() {
    this.authService.checkAdminExists().subscribe(hasAdmin => {
      this.hasAdminAccount = hasAdmin;
    });
  }

  onLogin() {
    if (!this.loginForm.valid) return;
    this.errorMessage = '';

    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe(success => {
      if (success) {
        this.router.navigate(['/intake']);
      } else {
        this.errorMessage = 'Invalid username or password.';
      }
    });
  }

  onRegisterAdmin() {
    if (!this.registerAdminForm.valid) return;
    this.errorMessage = '';
    this.successMessage = '';

    const { password, confirmPassword } = this.registerAdminForm.value;
    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.authService.registerAdmin(password).subscribe(
      res => {
        if (res && res.success) {
          this.successMessage = 'Administrator account registered successfully! Logging you in...';
          setTimeout(() => {
            this.authService.login('administrator', password).subscribe(() => {
              this.router.navigate(['/intake']);
            });
          }, 1000);
        } else {
          this.errorMessage = res.message || 'Error registering administrator account.';
        }
      },
      err => {
        this.errorMessage = err.error?.message || 'Failed to register administrator account.';
      }
    );
  }
}
