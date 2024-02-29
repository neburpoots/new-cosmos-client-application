import { FormGroup } from "@angular/forms";


export interface IAbstractForm<T> {
    url: string;
    onSubmit: () => void;
    create: (data: T) => Promise<void>;
    update: (data: T) => Promise<void>;
    myForm: FormGroup;
}