import { Component, OnInit } from "@angular/core";
import { NewsService } from "./news.service";

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.scss"]
})
export class NewsComponent implements OnInit {
  public news: [] = [];
  public newsSources: [] = [];

  filterSource = "google-news";
  constructor(private newsService: NewsService) {}

  ngOnInit() {
    // this.newsService.getTopHeadLines()
    //  .subscribe(
    //     response => { this.news = response;
    //                 console.table(this.news);
    //     }
    // );

    let source = "newsweek";

    this.newsService.getNewBySource(source).subscribe(response => {
      this.news = response;
      console.table(this.news);
    });

    this.getnewsSources();
  }

  filterNews() {
    let gazeta = this.filterSource;
    this.newsService.getNewBySource(gazeta).subscribe(response => {
      this.news = response;
      console.table("ffffffffffffffilter " + this.filterSource);
    });
  }

  getnewsSources() {
    this.newsService.getSources().subscribe(response => {
      this.newsSources = response;
      console.table(this.newsSources);
    });
  }
}
