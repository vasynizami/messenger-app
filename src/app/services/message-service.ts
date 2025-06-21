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
    phoneNumber: string;
    text: string;
  }): Observable<IMessage> {
    return this.apiService.post('/messages', messageData).pipe(
      catchError((err) => {
        console.error('Error creating message:', err);
        throw err;
      })
    );
  }
}
