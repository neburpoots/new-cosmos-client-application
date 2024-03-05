import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'input-component',
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() displayName: string = '';
  @Input() name: string = '';
  @Input() errors: any[] = [];
  @Input() form: FormGroup = new FormGroup({});
  @Input() touched: any = false;
  @Input() inputType: string = 'text';
  @Input() isSubmitted: boolean = false;
}
