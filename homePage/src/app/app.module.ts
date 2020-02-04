import { LoginComponent } from './shared/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { ArticlelistComponent } from './modules/articlelist/articlelist.component';
import { MaterialModule } from "./material.module";
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NewarticleComponent } from './modules/articlelist/newarticle/newarticle.component';
import { ArticleComponent } from './modules/article/article.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { ServerErrorComponent } from './error-pages/server-error/server-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ConfirmationdialogComponent } from './shared/tools/confirmationdialog/confirmationdialog.component';
import { ToastrModule } from 'ngx-toastr';
import { UpdatearticleComponent } from './modules/articlelist/updatearticle/updatearticle.component';





@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ArticlelistComponent,
    NewarticleComponent,
    NotFoundComponent,
    ServerErrorComponent,
    ConfirmationdialogComponent,
 UpdatearticleComponent,
 LoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
 FlexLayoutModule,
 ToastrModule.forRoot(),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [ArticlelistComponent, NewarticleComponent,  ConfirmationdialogComponent,
    UpdatearticleComponent, LoginComponent]
})
export class AppModule { }
