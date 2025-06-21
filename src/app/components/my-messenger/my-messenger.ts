import { Component, inject, OnInit } from '@angular/core';
import { MessageForm } from '../message-form/message-form';
import { MessageList } from '../message-list/message-list';
import { IMessage } from '../../interfaces/message';
import { MessageService } from '../../services/message-service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-messenger',
  imports: [MessageForm, MessageList],
  templateUrl: './my-messenger.html',
  styleUrl: './my-messenger.scss',
})
export class MyMessenger implements OnInit {
  readonly CHARACTER_LIMIT = 250;
  private service = inject(MessageService);
  private router = inject(Router);
  public messages$!: Observable<IMessage[]>;

  ngOnInit() {
    this.loadMessages();
  }

  private loadMessages() {
    this.messages$ = this.service.getAll();
  }

  public onMessageSubmitted() {
    this.loadMessages();
  }

  public onLogout() {
    this.router.navigate(['/logout']);
  }
}
