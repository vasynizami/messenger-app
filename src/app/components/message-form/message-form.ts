import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MessageService } from '../../services/message-service';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-form',
  imports: [ReactiveFormsModule, NgxMaskDirective, CommonModule],
  providers: provideNgxMask(),
  templateUrl: './message-form.html',
  styleUrl: './message-form.scss',
})
export class MessageForm implements OnInit {
  @Input() characterLimit!: number;
  @Output() messageSubmitted = new EventEmitter<void>();

  public form!: FormGroup;
  public isSubmitting = false;
  public submitError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      phoneNumber: new FormControl('', Validators.required),
      message: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.characterLimit),
      ]),
    });
  }

  public onSubmit() {
    if (this.form.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitError = null;

      const formData = this.form.value;

      this.messageService
        .create({
          phone_number: formData.phoneNumber,
          text: formData.message,
        })
        .pipe(
          finalize(() => {
            this.isSubmitting = false;
          })
        )
        .subscribe({
          next: (response) => {
            console.log('Message submitted successfully:', response);
            this.form.reset();
            this.messageSubmitted.emit();
          },
          error: (error) => {
            console.error('Error submitting message:', error);
            this.submitError = 'Failed to submit message. Please try again.';
          },
        });
    }
  }

  public onClear() {
    this.form.reset();
    this.submitError = null;
  }

  public getCharacterCountClass(message: string): string {
    const currentCount = message.length;
    return currentCount > this.characterLimit
      ? 'character-count-warning'
      : 'character-count-normal';
  }

  public getCharacterCount(): string {
    const messageControl = this.form.get('message');
    const currentCount = messageControl?.value?.length || 0;
    return `${currentCount}/${this.characterLimit}`;
  }
}
