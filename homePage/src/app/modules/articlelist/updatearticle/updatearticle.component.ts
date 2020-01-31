import { Article } from 'src/app/shared/models/article';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ToastrService } from 'ngx-toastr';

export interface Grupa {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-updatearticle',
  templateUrl: './updatearticle.component.html',
  styleUrls: ['./updatearticle.component.scss']
})
export class UpdatearticleComponent implements OnInit {
adForm: FormGroup;
groups: Grupa[] = [
  { value: "Agular", viewValue: "Agular" },
  { value: "C#", viewValue: "C#" },
  { value: "Development", viewValue: "Development" },
  { value: "Sport", viewValue: "Sport" },
  { value: "Others", viewValue: "Others" }
];

  constructor(  public dialogRef: MatDialogRef<UpdatearticleComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Article,
                private datePipe: DatePipe,
                private repoService: RepositoryService,
                private toastr: ToastrService) { }

  ngOnInit() {
    console.log('data do update ' + this.data.id);
    console.log('data description ' + this.data.description);

    let ddMMyyyy = this.datePipe.transform(new Date(), "yyyy-MM-dd");

    this.adForm = new FormGroup({
      id: new FormControl("", Validators.required),
      url: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      remarks: new FormControl("", Validators.required),
      createddate: new FormControl(ddMMyyyy),
      note: new FormControl(""),
      group: new FormControl(0, Validators.required)
    });

    this.adForm.patchValue({
      id: this.data.id,
      url: this.data.url,
      description: this.data.description,
      remarks: this.data.remarks,
      createddate: this.data.createddate,
      note: this.data.note,
      group: this.data.group
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


  updateArticle() {
    this.repoService.update("api/link", this.adForm.value).subscribe(
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
