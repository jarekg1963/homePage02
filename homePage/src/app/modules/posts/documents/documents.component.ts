import { file } from "./../../../shared/models/file";
import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { DocumentsService } from "src/app/shared/services/documents.service";
import { HttpClient } from "@angular/common/http";
import { FormControl } from "@angular/forms";
import { saveAs } from "file-saver";
import { ConfirmationdialogComponent } from 'src/app/shared/tools/confirmationdialog/confirmationdialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: "app-documents",
  templateUrl: "./documents.component.html",
  styleUrls: ["./documents.component.scss"]
})
export class DocumentsComponent implements OnInit {
  @Input() idPostu: number;
  documents$: Observable<file[]>;
  fname: string;
  public urlAddress = ".";
  showfname = true;

  files: FileList;
  fileData: File = null;
  constructor(
    private documentService: DocumentsService,
    private http: HttpClient,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loadDocuments();
  }

  loadDocuments() {
    this.documents$ = this.documentService.getAllDocuments(this.idPostu);
  }

  pokazDoc(documentName) {

}


  onFileChanged(event) {
    this.fileData = event.target.files[0];
    const formData = new FormData();
    formData.append("filesdata", this.fileData);
    this.http
      .post(
        this.urlAddress +
          "/api/uploadfiles/" +
          "?idPost=" +
          this.idPostu +
          "&fname=" +
          this.fname,
        formData
      )
      .subscribe(res => {
        //     console.log(res);
        alert("SUCCESS !!");
        this.loadDocuments();
      });
  }


  deleteDocument(idPliku): void {
    const dialogRef = this.dialog.open(ConfirmationdialogComponent, {
      width: "350px",
      data: "Do you want delete?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       this.kasujplik(idPliku);
      }
    });
  }



  kasujplik(idPliku: number) {
    this.documentService.deleteBlogPost(idPliku).subscribe(data => {
      console.log(" skasowano");
      this.loadDocuments();
    });
  }

  public showPDF(nazwaPliku: string): void {
    this.documentService.getPDF(nazwaPliku)
        .subscribe(x => {
            // It is necessary to create a new blob object with mime-type explicitly set
            // otherwise only Chrome works like it should
            var newBlob = new Blob([x], { type: "application/pdf" });

            // IE doesn't allow using a blob object directly as link href
            // instead it is necessary to use msSaveOrOpenBlob
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(newBlob);
                return;
            }

            // For other browsers:
            // Create a link pointing to the ObjectURL containing the blob.
            const data = window.URL.createObjectURL(newBlob);

            var link = document.createElement('a');
            link.href = data;
            link.download = nazwaPliku;
            // this is necessary as link.click() does not work on the latest firefox
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

            setTimeout(function () {
                // For Firefox it is necessary to delay revoking the ObjectURL
                window.URL.revokeObjectURL(data);
                link.remove();
            }, 100);
        });
}

}
