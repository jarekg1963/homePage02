import { Component, OnInit } from "@angular/core";
import { MatDialogRef, MatDialog } from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from "@angular/material/core";
import { DatePipe } from "@angular/common";

import { RepositoryService } from "src/app/shared/services/repository.service";
import { ToastrService } from "ngx-toastr";

export interface Grupa {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-newarticle",
  templateUrl: "./newarticle.component.html",
  styleUrls: ["./newarticle.component.scss"]
})
export class NewarticleComponent implements OnInit {
  adForm: FormGroup;
  groups: Grupa[] = [
    { value: "Agular", viewValue: "Agular" },
    { value: "C#", viewValue: "C#" },
    { value: "Development", viewValue: "Development" },
    { value: "Sport", viewValue: "Sport" },
    { value: "Others", viewValue: "Others" }
  ];

  constructor(
    public dialogRef: MatDialogRef<NewarticleComponent>,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private repoService: RepositoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    let ddMMyyyy = this.datePipe.transform(new Date(), "yyyy-MM-dd");

    this.adForm = new FormGroup({

      url: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      remarks: new FormControl("", Validators.required),
      createddate: new FormControl(ddMMyyyy),
      note: new FormControl(""),
      group: new FormControl(0, Validators.required)
    });

    this.adForm.patchValue({
      url: "",
      description: "",
      remarks: "",
      createddate: ddMMyyyy,
      note: "",
      group: ""
    });
  }

  get url() {
    return this.adForm.get("url");
  }

  get description() {
    return this.adForm.get("description");
  }

  get remarks() {
    return this.adForm.get("remarks");
  }

  get createddate() {
    return this.adForm.get("createddate");
  }

  get note() {
    return this.adForm.get("note");
  }

  get group() {
    return this.adForm.get("group");
  }

  onCloseClick() {
    this.dialogRef.close();
  }



  addNewArticle() {
    this.repoService.Addnew("api/link", this.adForm.value).subscribe(
      data => {
        this.toastr.success("Saved ", "OK");
      },
      err => {
        console.log(err);
      }
    );
    this.dialogRef.close();
  }
}
