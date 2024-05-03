import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'input-component',
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() displayName: string = '';
  @Input() name: string = '';
  @Input() inline: boolean = false;
  @Input() errors: any[] = [];
  @Input() suffix: string | null = null;
  @Input() form: FormGroup = new FormGroup({});
  @Input() touched: any = false;
  @Input() description: string | null = null;
  @Input() inputType: 'number' | 'date' | 'checkbox' | 'textarea' | 'text' | 'password' = 'text';
  @Input() isSubmitted: boolean = false;
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  changeEmit(event: any) {
    this.onChange.emit(event);
  }
}
