import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
@Injectable()
export class ListenerService {
  private socket;
  constructor() {
  }
  connectGo(): Subject<MessageEvent> {
    this.socket = io('localhost:8000');
    let observable = new Observable(Observer => {
      this.socket.on('fetchTweets', ({ tweets }) => {
        console.log(tweets);
        Observer.next({ tweets })
      })
      return () => { this.socket.disconnect() }
    })
    let observer = {
      next: (data: Object) => {
      }
    }
    return Subject.create(observer, observable)
  }

}