import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DefaultComponent } from "./layouts/default/default.component";
import { DashboardComponent } from "./modules/dashboard/dashboard.component";
import { PostsComponent } from "./modules/posts/posts.component";
import { ArticleComponent } from "./modules/article/article.component";
import { NotFoundComponent } from "./error-pages/not-found/not-found.component";
import { ServerErrorComponent } from "./error-pages/server-error/server-error.component";
import { BlogPostAddEditComponent } from "./modules/posts/blog-post-add-edit/blog-post-add-edit.component";
import { BlogPostComponent } from "./modules/posts/blog-post/blog-post.component";
import { AuthService as authGuard} from "./shared/services/auth.service";
import { TestlayoutComponent } from './shared/components/testlayout/testlayout.component';
import { ProjectsComponent } from './modules/projects/projects.component';
import { NoteListComponent } from './modules/notes/note-list/note-list.component';
import { NoteEditComponent } from './modules/notes/note-edit/note-edit.component';
import { NewsComponent } from './modules/news/news.component';


const routes: Routes = [
  {
    path: "",
    component: DefaultComponent,
    children: [
      {
        path: "",
        component: DashboardComponent
      },
      {
        path: "posts",
        component: PostsComponent,
        canActivate: [authGuard],
        children: [

        ]
      },

      {
        path: "articles",
        component: ArticleComponent
      },
      { path: 'blogpost/:id', component: BlogPostComponent },
      { path: 'add', component: BlogPostAddEditComponent },
      { path: 'blogpost/edit/:id', component: BlogPostAddEditComponent },
      { path: 'testlayout', component: TestlayoutComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'notes', component: NoteListComponent  },
      { path: 'news', component: NewsComponent  }

    ]
  },
  { path: "404", component: NotFoundComponent },
  { path: "500", component: ServerErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })], // refresh zaczuna dziac
  exports: [RouterModule]
})
export class AppRoutingModule {}
