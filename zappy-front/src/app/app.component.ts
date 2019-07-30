import { Component } from '@angular/core';
import { ListenerService } from './listener-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  tweets = [];

  constructor(private listenerService: ListenerService) {
    this.listenerService.connectGo().subscribe((result: any) => {
      this.tweets = result.tweets;
    });
  }
}
