import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMessage } from '../../interfaces/message';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-message-list',
  imports: [CommonModule],
  templateUrl: './message-list.html',
  styleUrl: './message-list.scss',
})
export class MessageList {
  @Input() messages$!: Observable<IMessage[]>;

  ngOnInit() {}
}
