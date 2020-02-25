import { CalendarService } from './../../shared/services/calendar.service';
import { calendarE } from './../../shared/models/calendarE';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { compareAsc, format, parse } from 'date-fns';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';

import { Subject, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { AddediteventComponent } from './addeditevent/addeditevent.component';
import { EventslistComponent } from './eventslist/eventslist.component';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };


  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];


  refresh: Subject<any> = new Subject();


  activeDayIsOpen: boolean = true;

  calendarEvents$: Observable<calendarE[]>;

  constructor(private modal: NgbModal,   public dialogRef: MatDialogRef<CalendarComponent>,
              private calendarService: CalendarService,   public dialog: MatDialog,) {


  }

  data: any = [];
  events: any = [];
  ngOnInit() {
    this.getAllevents();
  }

  public getAllevents = () => this.calendarService.Getcalendarevents().subscribe(
    res => {
        this.data = res ;

        for (var i = 0 ; i < this.data.length; i++) {
          this.events.push(
          {
                  start: parse(this.data[i].start, 'd/M/yyyy HH:mm:ss', new Date()),
                  end: parse(this.data[i].end, 'd/M/yyyy HH:mm:ss', new Date()),
                  title:  this.data[i].title,
                  color: this.data[i].color,
                  actions: this.actions,
                  allDay: false,
                  resizable: this.data[i].resizable,
                  draggable: true
          }
        );
      }
    }
    )


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.width = "750px";
      dialogConfig.height = "750px";
      dialogConfig.autoFocus = true;
      // dane transportowane do formularza
      dialogConfig.data = this.data;
      let dialogRef = this.dialog.open(AddediteventComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        // this.getAllArticles();
      });




  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  onCloseClick(): void {
    this.dialogRef.close();
  }

  listEvents() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "1100";
    dialogConfig.height = "800px";
    dialogConfig.autoFocus = true;
    // dane transportowane do formularza
    dialogConfig.data = this.data;
    let dialogRef = this.dialog.open(EventslistComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // this.getAllArticles();
    });

  }

}
