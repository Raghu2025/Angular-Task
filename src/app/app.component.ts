import { Component, OnInit } from '@angular/core';
import { ServerService } from './server/server.service';
import { LoadingService } from './service/loading.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular-Task';
  loading:boolean = false
  constructor(private server:ServerService,private loadingService:LoadingService){

  }
  ngOnInit(): void {
    this.server.atFirst()
    this.listenToLoading()
  }

  listenToLoading(): void {
    this.loadingService.loadingSub
      .pipe(delay(0))
      .subscribe((loading:boolean) => {
        this.loading = loading;
      });
  }

}
