import { Component, inject, OnInit } from '@angular/core';
import { MessageForm } from '../message-new/message-form';
import { MessageList } from '../message-list/message-list';
import { IMessage } from '../../interfaces/message';
import { MessageService } from '../../services/message-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-messenger',
  imports: [MessageForm, MessageList],
  templateUrl: './my-messenger.html',
  styleUrl: './my-messenger.scss',
})
export class MyMessenger implements OnInit {
  private service = inject(MessageService);
  public messages$!: Observable<IMessage[]>;

  ngOnInit() {
    this.messages$ = this.service.getAll();
  }
}
