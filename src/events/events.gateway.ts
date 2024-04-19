import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Observable, of } from 'rxjs';

import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log(socket.connected);
    });
  }

  // Listenning to this event
  // Client can send message to me by using the message key/event name
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody()
    data: any,
  ): Observable<WsResponse<any>> | any {
    console.log('Message is reveived from the client');
    console.log(data);
    // here we did not send message back to the server

    // save msg to db and return the reply in the response
    // call the service method to save record in the DB

    return of({ event: 'message', data: 'Hello from the server' });
  }
}
