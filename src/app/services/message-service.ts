import { inject, Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { catchError, Observable, of } from 'rxjs';
import { IMessage } from '../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiService = inject(ApiService);

  constructor() {}

  public getAll(): Observable<IMessage[]> {
    return this.apiService.get('/messages').pipe(catchError((err) => of([])));
  }
}
