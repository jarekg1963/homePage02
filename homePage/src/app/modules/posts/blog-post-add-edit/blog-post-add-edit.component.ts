import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BlogPost } from 'src/app/shared/models/BlogPost';
import { BlogPostService } from 'src/app/shared/services/blog-post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-post-add-edit',
  templateUrl: './blog-post-add-edit.component.html',
  styleUrls: ['./blog-post-add-edit.component.scss']
})
export class BlogPostAddEditComponent implements OnInit {

  dataStr: string;
  form: FormGroup;
  actionType: string;
  formTitle: string;
  formBody: string;
  formCreator: string;
  id: number;
  errorMessage: any;
  existingBlogPost: BlogPost;

  constructor(private blogPostService: BlogPostService,
              private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {

    const idParam = 'id';
    this.actionType = 'Add';
    this.formTitle = 'title';
    this.formBody = 'body';
    this.formCreator = 'creator';
    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        id: 0,
        title: ['', [Validators.required]],
        body: ['', [Validators.required]],
        creator: ['', [Validators.required]]
      }
    );
  }

  ngOnInit() {

    this.dataStr = new Date().toLocaleDateString();

    if (this.id > 0) {
      this.actionType = 'Edit';
      this.blogPostService.getBlogPost(this.id)
        .subscribe(data => (
          this.existingBlogPost = data,
          this.form.controls[this.formTitle].setValue(data.title),
          this.form.controls[this.formBody].setValue(data.body),
          this.form.controls[this.formCreator].setValue(data.creator)
        ));
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      let blogPost: BlogPost = {
        dt: this.dataStr,
        creator: this.form.get(this.formCreator).value,
        title: this.form.get(this.formTitle).value,
        body: this.form.get(this.formBody).value
      };
      this.blogPostService.saveBlogPost(blogPost)
        .subscribe((data) => {
          this.router.navigate(['/blogpost', data.id]);
        });
    }


    if (this.actionType === 'Edit') {
      let blogPost: BlogPost = {
        id: this.existingBlogPost.id,
        dt: this.dataStr,
        creator:  this.form.get(this.formCreator).value,
        title: this.form.get(this.formTitle).value,
        body: this.form.get(this.formBody).value
      };

      this.blogPostService.updateBlogPost(blogPost.id, blogPost)
        .subscribe((data) => {
          this.router.navigate([this.router.url]);
        });
    }
  }

  cancel() {
    this.router.navigate(['/posts']);
  }

  get title() { return this.form.get(this.formTitle); }
  get body() { return this.form.get(this.formBody); }
  get creator() { return this.form.get(this.formBody); }
}
