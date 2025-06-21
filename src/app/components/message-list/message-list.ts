import { Component, Input } from '@angular/core';
import { IMessage } from '../../interfaces/message';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-message-list',
  imports: [],
  templateUrl: './message-list.html',
  styleUrl: './message-list.scss',
})
export class MessageList {
  @Input() messages$!: Observable<IMessage[]>;
}
