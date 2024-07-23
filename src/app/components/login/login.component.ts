import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    localStorage.removeItem('loggedIn');
  }

  login(): void {
    this.authService
      .login(this.username, this.password)
      .subscribe((loggedIn: boolean) => {
        if (loggedIn) {
          this.router.navigate(['/home']);
        } else {
          this.error = 'Invalid username or password';
        }
      });
  }
}
