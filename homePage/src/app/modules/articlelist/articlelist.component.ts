import { ToastrService } from "ngx-toastr";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialogRef,
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialogConfig,
  MatDialog
} from "@angular/material";
import { Article } from "src/app/shared/models/article";
import { RepositoryService } from "src/app/shared/services/repository.service";
import { NewarticleComponent } from "./newarticle/newarticle.component";
import { ErrorHandlerService } from "src/app/shared/services/error-handler.service";
import { ConfirmationdialogComponent } from 'src/app/shared/tools/confirmationdialog/confirmationdialog.component';

@Component({
  selector: "app-articlelist",
  templateUrl: "./articlelist.component.html",
  styleUrls: ["./articlelist.component.scss"]
})
export class ArticlelistComponent implements OnInit {
  params: any;
  public displayedColumns = [
    "id",
    "url",
    "description",
    "remarks",
    "createddate",
    "note",
    "group",
    "details",
    "update",
    "delete"
  ];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  data: any = [];

  public dataSource = new MatTableDataSource<Article>();

  constructor(
    public dialogRef: MatDialogRef<ArticlelistComponent>,
    private repoService: RepositoryService,
    public dialog: MatDialog,
    private errorService: ErrorHandlerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getAllArticles();
  }

  public getAllArticles = () => {
    this.repoService.getData("api/link").subscribe(
      res => {
        this.dataSource.data = res as Article[];
      },
      error => {
        this.errorService.handleError(error);
      }
    );
  };

  onCloseClick(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  onaddNewClick() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.width = "1150px";
    dialogConfig.height = "680px";
    dialogConfig.autoFocus = true;
    // dane transportowane do formularza
    dialogConfig.data = this.data;
    let dialogRef = this.dialog.open(NewarticleComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.getAllArticles();
    });
  }

  deleteArticle(id): void {
    const dialogRef = this.dialog.open(ConfirmationdialogComponent, {
      width: "350px",
      data: "Do you want delete?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.repoService.delete("api/link/" + id).subscribe(data => {
          this.toastr.success("Deleted ", "OK");
          this.getAllArticles();
        });

      }
    });
  }
}
