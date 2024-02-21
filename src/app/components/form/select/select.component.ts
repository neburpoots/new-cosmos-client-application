import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'select-component',
  templateUrl: './select.component.html',
})
export class SelectComponent {
  @Input() displayName: string = '';
  @Input() name: string = '';
  @Input() errors: any[] = [];
  @Input() form: FormGroup = new FormGroup({});
  @Input() touched: any = false;
  @Input() options: any[] = [];
  @Input() placeholder: any = '';
  @Input() selectedOption: any = '';
}
