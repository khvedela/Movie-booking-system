import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = this.initiateRegisterForm();

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  initiateRegisterForm(): FormGroup {
    return this.fb.group({
      userName: ['',
      [Validators.required]
      ],
      phoneNumber: ['',
        [Validators.required]
      ],
      email: ['',
        [Validators.required]
      ],
      password: ['',
        [Validators.required]
      ],
      passwordConfirm: ['',
        [Validators.required]
      ],
    })
  }

  initiateRegister(): void {
    this.auth.register({
      userName: this.registerForm.value.userName,
      phoneNumber: this.registerForm.value.phoneNumber,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }).subscribe();

    console.log({
      userName: this.registerForm.value.userName,
      phoneNumber: this.registerForm.value.phoneNumber,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    })
  }

  ngOnInit(): void {
  }

}
