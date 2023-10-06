import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginResponseType} from "../../../../types/login-response.type";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/), Validators.required]),
  })

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {
  }

  login(): void {
    if (this.loginForm.valid && this.loginForm.value.email && this.loginForm.value.password) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: (data: LoginResponseType) => {
            if (data.error || !data.accessToken || !data.refreshToken || !data.fullName || !data.userId) {
              this._snackBar.open('Ошибка при авторизации');
              throw new Error(data.message ? data.message : " Error with data on login");
            }

            // if (this.loginForm.value.email) {
            //   this.authService.setUserInfo({
            //     fullName: data.fullName,
            //     userId: data.userId,
            //     email: this.loginForm.value.email,
            //   });
            // }
            //
            // this.authService.setTokens(data.accessToken, data.refreshToken);
            this.router.navigate(['/choice']);
          },
          error: (err: HttpErrorResponse) => {
            this._snackBar.open('Ошибка при авторизации');
            throw new Error(err.error.message);
          }
        });
    }
  }
}
