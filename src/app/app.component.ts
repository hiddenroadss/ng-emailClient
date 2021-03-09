import { Component } from '@angular/core';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  signin = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.checkAuthStatus().subscribe(() => {});
    this.authService.signin$.subscribe(signin => {
      this.signin = signin;
    })
  }
}
