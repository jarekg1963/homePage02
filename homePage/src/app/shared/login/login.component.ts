import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  error = '';
  constructor( public dialogRef: MatDialogRef<LoginComponent>, private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['',[
        Validators.required,
        Validators.minLength(2)
      ]],
      password: ['',[
        Validators.required,
        Validators.minLength(2)
      ]],
    });
  }

  get username(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }


	onLogin(){
    // output submitted data
    console.log(this.username.value, this.password.value)


}

  onCloseClick() {
    this.dialogRef.close();
  }

}
