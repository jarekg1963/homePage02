import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ArticlelistComponent } from 'src/app/modules/articlelist/articlelist.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor( public dialog: MatDialog) { }

  ngOnInit() { }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  articleList() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.width = "1200px";
    dialogConfig.height = "700px";
    dialogConfig.autoFocus = true;
    // dane transportowane do formularza
    // dialogConfig.data = this.data;

    this.dialog.open(ArticlelistComponent, dialogConfig);

  }

}
