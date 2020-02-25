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
import { BlogPostComponent } from './modules/posts/blog-post/blog-post.component';
import { BlogPostAddEditComponent } from './modules/posts/blog-post-add-edit/blog-post-add-edit.component';
import { CalendarComponent } from './modules/calendar/calendar.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AddediteventComponent } from './modules/calendar/addeditevent/addeditevent.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { EventslistComponent } from './modules/calendar/eventslist/eventslist.component';
import { TestlayoutComponent } from './shared/components/testlayout/testlayout.component';
import { FullcalendarComponent } from './modules/fullcalendar/fullcalendar.component';
import {DataTablesModule} from 'angular-datatables';


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
 LoginComponent,
 BlogPostComponent,
 BlogPostAddEditComponent,
 CalendarComponent,
 AddediteventComponent,
 EventslistComponent,
 TestlayoutComponent,
 FullcalendarComponent,


  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
 FlexLayoutModule,
 ToastrModule.forRoot(),
 CalendarModule.forRoot({
  provide: DateAdapter,
  useFactory: adapterFactory,
}),
FlatpickrModule.forRoot(),
NgbModule,
OwlDateTimeModule,
OwlNativeDateTimeModule
  ],
  providers: [DatePipe

  ],
  bootstrap: [AppComponent],
  entryComponents: [ArticlelistComponent, NewarticleComponent,  ConfirmationdialogComponent,
    UpdatearticleComponent, LoginComponent, CalendarComponent, AddediteventComponent, EventslistComponent,
    FullcalendarComponent]
})
export class AppModule { }
