import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-message-form',
  imports: [ReactiveFormsModule, NgxMaskDirective],
  providers: provideNgxMask(),
  templateUrl: './message-form.html',
  styleUrl: './message-form.scss',
})
export class MessageForm implements OnInit {
  public form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      phoneNumber: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });
  }

  public onSubmit() {
    console.log('submit', this.form.value());
  }

  public onClear() {
    this.form.reset();
  }
}
