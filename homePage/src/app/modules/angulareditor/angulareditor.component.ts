import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-angulareditor',
  templateUrl: './angulareditor.component.html',
  styleUrls: ['./angulareditor.component.scss']
})
export class AngulareditorComponent implements OnInit {
  htmlContent: any;
  htmlContent1 = '';
  form: FormGroup;

  config1: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '5rem',
    maxHeight: '50rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: false,
    toolbarPosition: 'top',
    outline: true,
    defaultFontName: 'Arial',
    defaultFontSize: '3',
    showToolbar: true,
    defaultParagraphSeparator: 'p',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };

  // ,
  // toolbarHiddenButtons: [
  //   ['bold', 'italic'],
  //   ['fontSize']
  // ]

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AngulareditorComponent>) { }

  ngOnInit() {
    // this.form = this.formBuilder.group({
    //   signature: ['', Validators.required]
    // });
    console.log(this.htmlContent1);
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  saveText() {
    saveAs(new Blob([this.htmlContent1], { type: "html" }), 'data.html');
  }


}
