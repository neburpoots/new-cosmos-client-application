import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'select-component',
  templateUrl: './select.component.html',
})
export class SelectComponent {
  @Input() displayName: string = '';
  @Input() name: string = '';  
  @Input() inline: boolean = false;
  @Input() errors: any[] = [];
  @Input() form: FormGroup = new FormGroup({});
  @Input() touched: any = false;
  @Input() options: any[] = [];
  @Input() placeholder: any = '';
  @Input() selectedOption: any = '';

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  changeEmit(event : any) {
    this.onChange.emit(event);
  }
}
