import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Login} from "../../models/login.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.initLoginForm();
  private invalidLogin!: boolean;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  initLoginForm(): FormGroup {
    return this.fb.group({
      email: ['',
      [Validators.required]
      ],
      password: ['',
      [Validators.required]
      ]
    })
  }

  initiateLogin(): void {
    this.auth.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }).subscribe((response: any) => {
      const token = (<any>response).token;
      const refreshToken = (<any>response).refreshToken;
      localStorage.setItem('jwt', token);
      localStorage.setItem('refreshToken', refreshToken);
      this.invalidLogin = false;
      this.router.navigate(['/']);
    }, err => {
      this.invalidLogin = true;
    })
    console.log(this.invalidLogin);
  }
}
