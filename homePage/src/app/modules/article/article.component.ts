import { Article } from "./../../shared/models/article";
import { Component, OnInit } from "@angular/core";
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.scss"]
})
export class ArticleComponent implements OnInit {
  public cardList: Article[] = [];

  constructor(private repoService: RepositoryService,   private errorService: ErrorHandlerService,) {}

  ngOnInit() {
    // this.wczytajMocka();
    this.getAllArticles();
  }

  public getAllArticles = () => {
    this.repoService.getData("api/link").subscribe(
      res => {
        this.cardList = res as Article[];
        console.log(this.cardList);
      },
      error => {
        this.errorService.handleError(error);
      }
    );
  }

wczytajMocka() {
  this.cardList.push({
    remarks: "http://via.placeholder.com/300",
    note: "Card No. ",
    description:
      "Angular Flex Layout provides a sophisticated layout API using FlexBox CSS + mediaQuery.\
        This module provides Angular developers with component layout features using a custom Layout API, \
        mediaQuery observables, and injected DOM flexbox-2016 css stylings.",
    url: "",
    createddate: "",
    group: "",
    id: 1
  });
  this.cardList.push({
    remarks: "http://via.placeholder.com/300",
    note: "Card No. ",
    description:
      "Angular Flex Layout provides a sophisticated layout API using FlexBox CSS + mediaQuery.\
        This module provides Angular developers with component layout features using a custom Layout API, \
        mediaQuery observables, and injected DOM flexbox-2016 css stylings.",
    url: "",
    createddate: "",
    group: "",
    id: 2
  });
  this.cardList.push({
    remarks: "http://via.placeholder.com/300",
    note: "Card No. ",
    description:
      "Angular Flex Layout provides a sophisticated layout API using FlexBox CSS + mediaQuery.\
        This module provides Angular developers with component layout features using a custom Layout API, \
        mediaQuery observables, and injected DOM flexbox-2016 css stylings.",
    url: "",
    createddate: "",
    group: "",
    id: 3
  });
}

}
