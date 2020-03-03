import { CalendarComponent } from './../../../modules/calendar/calendar.component';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from "./../../services/auth.service";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MatDialogConfig, MatDialog } from "@angular/material";
import { ArticlelistComponent } from "src/app/modules/articlelist/articlelist.component";
import { LoginComponent } from "../../login/login.component";
import { ToastrService } from "ngx-toastr";


@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  userName = '';

  constructor(
    public dialog: MatDialog,
    private aut: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.userName = this.aut.loggedname();
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  }

  articleList() {
//    console.log(" srticle list " + this.aut.canActivate());
    if (this.aut.canActivate() === true) {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.width = "1200px";
      dialogConfig.height = "700px";
      dialogConfig.autoFocus = true;
      // dane transportowane do formularza
      // dialogConfig.data = this.data;

      this.dialog.open(ArticlelistComponent, dialogConfig);
    } else {
      this.toastr.error("Not logged in ", "OK");
    }
  }

  login() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.width = "500px";
    dialogConfig.height = "400px";
    dialogConfig.autoFocus = true;
    // dane transportowane do formularza
    // dialogConfig.data = this.data;

    let dialogRef = this.dialog.open(LoginComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result =>
      this.userName = this.aut.loggedname()
      );

  }

  help() {
    console.log(" storage " + this.aut.canActivate());
    // console.log('user from storage ' + localStorage.getItem("curentUser"));
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.userName = this.aut.loggedname();
  }

  calendar() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.width = "1000px";
    dialogConfig.height = "800px";
    dialogConfig.autoFocus = true;
    // dane transportowane do formularza
    // dialogConfig.data = this.data;

    let dialogRef = this.dialog.open(CalendarComponent, dialogConfig);

  }



}
