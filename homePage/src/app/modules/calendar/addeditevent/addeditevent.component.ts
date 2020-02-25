import { CalendarService } from "./../../../shared/services/calendar.service";
import { calendarE } from "./../../../shared/models/calendarE";
import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { ToastrService } from "ngx-toastr";

import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder } from '@angular/forms';

@Component({
  selector: "app-addeditevent",
  templateUrl: "./addeditevent.component.html",
  styleUrls: ["./addeditevent.component.scss"]
})


export class AddediteventComponent implements OnInit {
date: any;
  favoriteSeason: string;
  seasons: string[] = ['Private', 'Company', 'Entertaiment', 'Others'];
  sstart: any;
  send: any;
  stitle: string;
  ev: calendarE[];
  modelod: NgbDateStruct;
  modeldo: NgbDateStruct;
  checked = false;
  scolor: string;

  timeod = { hour: 8, minute: 18 };
  timedo = { hour: 8, minute: 18 };

  constructor(
    public dialogRef: MatDialogRef<AddediteventComponent>,
    private toastr: ToastrService,
    private calendar: NgbCalendar,
    private serv: CalendarService,
    private formBuilder: FormBuilder
  ) {


  }

  ngOnInit() {
    this.modelod = this.calendar.getToday();
    this.modeldo = this.calendar.getToday();
    const date = new Date();
    const minutes = date.getMinutes();
    const hourNow = date.getHours();
    this.timeod = { hour: hourNow, minute: minutes };
    this.timedo = { hour: hourNow, minute: minutes };
  }

  onSave() {

    if (this.favoriteSeason = "Private") {this.scolor =  "{primary:'#e3bc08',  secondary: '#FDF1BA'}"};

  this.sstart =  this.modelod.day + "/" + this.modelod.month + "/" + this.modelod.year + " "
  + this.timeod.hour + ":" + this.timeod.minute + ":" + "00";
  this.send =  this.modeldo.day + "/" + this.modeldo.month + "/" + this.modeldo.year + " " +
  this.timedo.hour + ":" + this.timedo.minute + ":" + "00";

  let evzm : calendarE = { start: this.sstart , end: this.send, title: this.stitle, allDay: this.checked? "true":"false",
                          color: this.scolor};

  this.serv.saveBEvent(evzm).subscribe(
        data => {
          this.toastr.success("Saved ", "OK");
        },
        err => {
          console.log(err);
        }
      );
  this.dialogRef.close();
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  selectToday() {
    this.modelod = this.calendar.getToday();
    this.modeldo = this.calendar.getToday();
  }
}
