import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMessenger } from './my-messenger';

describe('MyMessenger', () => {
  let component: MyMessenger;
  let fixture: ComponentFixture<MyMessenger>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyMessenger]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyMessenger);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
