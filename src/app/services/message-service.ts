import { inject, Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { catchError, Observable } from 'rxjs';
import { IMessage } from '../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiService = inject(ApiService);

  constructor() {}

  public getAll(): Observable<IMessage[]> {
    return this.apiService.get('/messages').pipe(
      catchError((err) => {
        console.error('Error getting messages:', err);
        throw err;
      })
    );
  }

  public create(messageData: {
    phone_number: string;
    text: string;
  }): Observable<IMessage> {
    const payload = {
      message: {
        phone_number: messageData.phone_number,
        text: messageData.text,
      },
    };

    return this.apiService.post('/messages', payload).pipe(
      catchError((err) => {
        console.error('Error creating message:', err);
        throw err;
      })
    );
  }
}
