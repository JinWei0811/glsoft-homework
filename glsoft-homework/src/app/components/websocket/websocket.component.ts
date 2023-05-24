import { Component, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css']
})
export class WebsocketComponent implements OnInit {

  socket$: WebSocketSubject<any> = new WebSocketSubject('ws://localhost:8080/websocket-endpoint');
  content: string = '';

  constructor() { };

  ngOnInit(): void {
    this.subscribeWebSocket();
  }

  sendMessage() {
    // this.socket$.next({ destination: '/hello', body: 123 });
    this.socket$.next({ name: '1', method: 'create' });
  }

  subscribeWebSocket() {
    this.socket$.subscribe(
      message => { console.log('接收到消息:', message); },
      error => { console.error('WebSocket错误:', error); },
      () => { console.log('WebSocket连接已关闭'); }
    );
  }
}
