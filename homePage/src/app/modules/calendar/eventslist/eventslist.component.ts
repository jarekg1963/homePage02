import { calendarE } from './../../../shared/models/calendarE';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-eventslist',
  templateUrl: './eventslist.component.html',
  styleUrls: ['./eventslist.component.scss']
})
export class EventslistComponent implements OnInit {
  params: any;
  public displayedColumns = [
    "id",
    "start",
    "end",
    "title",
    "actions",
    "allDay",
    "draggable",
    "color",
    "resizable",
    "details",
    "update",
    "delete"
  ];



  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  data: any = [];

  public dataSource = new MatTableDataSource<calendarE>();

  constructor(public dialogRef: MatDialogRef<EventslistComponent>,
              private calendarService: CalendarService,
              public dialog: MatDialog,
              private errorService: ErrorHandlerService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllEvents();
  }


  public getAllEvents = () => {
    this.calendarService.getEventsToList().subscribe(
      res => {
        this.dataSource.data = res as calendarE[];
        this.data = res;
        console.table(this.data);

      },
      error => {
        this.errorService.handleError(error);
      }
    );
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
  };

  onaddNewClick() {

  }
}
