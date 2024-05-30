import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { RoutesParams } from '../../app.routes';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public loginsCollection: any[] = [];
  public user: string = '';
  public countLogins: number = 0;

  email: string = '';
  password: string = '';

  loggedUser: string = '';
  flagError: boolean = false;
  msjError: string = '';

  constructor(private router: Router, public auth: Auth) {}

  goTo(path: RoutesParams) {
    this.router.navigate([path]);
  }

  predefinedData = {
    email: 'test2@test.com',
    password: '123456',
  };

  onSubmit(): void {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((res) => {
        if (res.user.email !== null) this.loggedUser = res.user.email;
        this.router.navigate(['welcome']);
        //{ user: string; password: string }
        //const data = { user: this.email, password: this.password };
        localStorage.setItem('current-user', this.email);
      })
      .catch((e) => {
        this.flagError = true;
        switch (e.code) {
          case 'auth/invalid-email':
            this.msjError = 'Email invalido';
            break;
          case 'auth/invalid-credential':
            this.msjError = 'Email o contraseña incorrecto';
            break;
          default:
            this.msjError = e.code;
            break;
        }
      });
  }
  autoCompleteAdmin(event: Event): void {
    event.preventDefault();
    this.email = 'admin@admin.com';
    this.password = '123456';
  }
  autoCompleteEmployer(event: Event): void {
    event.preventDefault();
    this.email = 'empleado@empleado.com';
    this.password = '123456';
  }
}
