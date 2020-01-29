import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-newarticle',
  templateUrl: './newarticle.component.html',
  styleUrls: ['./newarticle.component.scss']
})
export class NewarticleComponent implements OnInit {
  adForm: FormGroup;


  constructor(public dialogRef: MatDialogRef<NewarticleComponent>) { }

  ngOnInit() {

    this.adForm = new FormGroup({
      url: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      remarks: new FormControl("", Validators.required),
      createddate: new FormControl(""),
      note: new FormControl(""),
      group: new FormControl(0, Validators.required),

    });

    this.adForm.patchValue({
      url: "",
      description: "",
      remarks: "",
      createddate: "",
      note: "",
      group: "",
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

}
