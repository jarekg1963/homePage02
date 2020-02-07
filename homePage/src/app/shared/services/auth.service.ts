import { User } from './../login/login.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
aa: any;
  constructor() { }

  canActivate(): boolean {
    const user = localStorage.getItem('currentUser');

    if (user == null)   {
            return false;
        } else {

          console.log("json z serwisu parsowany " + user );
    return true; }
    }


loggedname(): string {
  return localStorage.getItem("currentUser")
}

  }
