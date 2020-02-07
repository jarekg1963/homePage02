import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


export interface User {
name: string;
group: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User[] = [] ;

  error = '';
  constructor( public dialogRef: MatDialogRef<LoginComponent>, private fb: FormBuilder,
               private toastr: ToastrService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
    });

    this.loginForm.patchValue({
      username: "Jarek",
      password: "pass"
    });

  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }


	onLogin(){
    // output submitted data

    if (this.username.value === 'Jarek'  &&  this.password.value === 'pass')
    {
      this.user.push({ name: 'Jarek', group: 'admin'});

      localStorage.setItem('currentUser', this.username.value);
      this.toastr.success("Logged succesfully ","OK");
    } else {
      localStorage.removeItem("currentUser");
    }

    this.dialogRef.close();

}

  onCloseClick() {
    localStorage.removeItem("currentUser");
    this.dialogRef.close();
  }

}
