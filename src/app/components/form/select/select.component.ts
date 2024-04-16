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
  @Input() isSubmitted: boolean = false;
  @Input() options: any[] = [];
  @Input() placeholder: any = '';
  @Input() selectedOption: any = '';
  @Input() isRequired: boolean = true;

  //if name doesn't exist use this string array with the keys of the props to fill the select
  @Input() customName: any[] | null = null;

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  changeEmit(event: any) {
    this.onChange.emit(event);
  }


  //this functions is used the calculate the name for the select
  //if you want to use embedded objects use an array in the customname array
  //the way you do this is this.customName = [['gasByGasId', 'name']]
  //sensor-types-form has a working example for this
  calculateName(option: any) {
    if (this.customName) {
        const getValueFromNestedProps = (obj: any, props: any): any => {
            let value = obj;
            for (const prop of props) {
                if (value[prop] !== null && value[prop] !== undefined) {
                    value = value[prop];
                } else {
                    // If any nested property is undefined, return an empty string
                    return prop;
                }
            }
            return value;
        };

        return this.customName.map((props: any) => {
            if (Array.isArray(props)) {
                return getValueFromNestedProps(option, props);
            } else {
                return props;
            }
        }).join('');
    }
    return option?.name;
}



}
