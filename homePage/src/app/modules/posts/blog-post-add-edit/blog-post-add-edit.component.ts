import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BlogPost } from 'src/app/shared/models/BlogPost';
import { BlogPostService } from 'src/app/shared/services/blog-post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-post-add-edit',
  templateUrl: './blog-post-add-edit.component.html',
  styleUrls: ['./blog-post-add-edit.component.scss']
})
export class BlogPostAddEditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formTitle: string;
  formBody: string;
  id: number;
  errorMessage: any;
  existingBlogPost: BlogPost;

  constructor(private blogPostService: BlogPostService,
              private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {

    const idParam = 'id';
    this.actionType = 'Add';
    this.formTitle = 'title';
    this.formBody = 'body';
    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        id: 0,
        title: ['', [Validators.required]],
        body: ['', [Validators.required]],
      }
    )
  }

  ngOnInit() {

    if (this.id > 0) {
      this.actionType = 'Edit';
      this.blogPostService.getBlogPost(this.id)
        .subscribe(data => (
          this.existingBlogPost = data,
          this.form.controls[this.formTitle].setValue(data.title),
          this.form.controls[this.formBody].setValue(data.body)
        ));
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {

      let blogPost: BlogPost = {

        dt: "01/01/2020",

        creator: 'Martin',

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
        dt: this.existingBlogPost.dt,
        creator: this.existingBlogPost.creator,
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
    this.router.navigate(['/']);
  }

  get title() { return this.form.get(this.formTitle); }
  get body() { return this.form.get(this.formBody); }

}
