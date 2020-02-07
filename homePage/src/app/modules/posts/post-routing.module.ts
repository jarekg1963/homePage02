import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { BlogPostAddEditComponent } from './blog-post-add-edit/blog-post-add-edit.component';

//const routes: Routes = [

//  { path: '', component: BlogPostComponent, pathMatch: 'full' },
  //{ path: 'blogpost/:id', component: BlogPostComponent },
  //{ path: 'add', component: BlogPostAddEditComponent },
  //{ path: 'blogpost/edit/:id', component: BlogPostAddEditComponent },
 //  { path: '**', redirectTo: '/' }

//];


@NgModule({
  //imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RoutingModule { }
