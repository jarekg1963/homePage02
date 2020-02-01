import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { ArticleComponent } from './modules/article/article.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { ServerErrorComponent } from './error-pages/server-error/server-error.component';

const routes: Routes = [


{ path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: DashboardComponent
  }, {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'articles',
    component: ArticleComponent
  }]
},
{path: '404', component: NotFoundComponent},
{ path: '500', component: ServerErrorComponent }

];



@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],  // refresf zaczuna dziac
  exports: [RouterModule]
})
export class AppRoutingModule { }
