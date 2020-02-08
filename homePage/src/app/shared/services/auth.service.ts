import { User } from './../login/login.component';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
aa: any;
  constructor(    private toastr: ToastrService) { }

  canActivate(): boolean {
    const user = localStorage.getItem('currentUser');

    if (user == null)   {
      this.toastr.error("Please first login", "No access");
            return false;
        } else {

    return true; }
    }


loggedname(): string {
  return localStorage.getItem("currentUser")
}

  }
