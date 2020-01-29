import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { Article } from 'src/app/shared/models/article';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { NewarticleComponent } from './newarticle/newarticle.component';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-articlelist',
  templateUrl: './articlelist.component.html',
  styleUrls: ['./articlelist.component.scss']
})
export class ArticlelistComponent implements OnInit {

  public displayedColumns = ['id', 'url', 'description', 'remarks', 'createddate' , 'note', 'group', 'details', 'update', 'delete'
];

@ViewChild(MatSort, {static: false}) sort: MatSort;
@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

data: any = [] ;

public dataSource = new MatTableDataSource<Article>();

  constructor( public dialogRef: MatDialogRef<ArticlelistComponent>, private repoService: RepositoryService,
               public dialog: MatDialog,private errorService: ErrorHandlerService ) { }

  ngOnInit() {
    this.getAllOwners();
  }

  public getAllOwners = () => {
    this.repoService.getData('api/link')
    .subscribe(res => {
      this.dataSource.data = res as Article[];
    },
    (error) => {
      this.errorService.handleError(error);
    });

  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onaddNewClick() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.width = "1150px";
    dialogConfig.height = "680px";
    dialogConfig.autoFocus = true;
    // dane transportowane do formularza
    dialogConfig.data = this.data;

    this.dialog.open(NewarticleComponent, dialogConfig);

  }




}
