import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMessage } from '../../interfaces/message';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-message-list',
  imports: [CommonModule],
  templateUrl: './message-list.html',
  styleUrl: './message-list.scss',
})
export class MessageList {
  @Input() messages$!: Observable<IMessage[]>;
  @Input() characterLimit!: number;

  getCharacterCount(message: IMessage): string {
    const currentCount = message.text.length;
    return `${currentCount}/${this.characterLimit}`;
  }

  formatPhoneNumber(phoneNumber: string): string {
    const cleaned = phoneNumber.replace(/\D/g, '');

    if (cleaned.length === 10) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(
        6
      )}`;
    }

    return phoneNumber || 'Invalid Phone';
  }

  formatCreatedAt(createdAt: string): string {
    try {
      const date = moment.utc(createdAt);

      if (!date.isValid()) {
        return 'Invalid Date';
      }

      return date.format('dddd, DD-MMM-YY HH:mm:ss [UTC]');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  }
}
