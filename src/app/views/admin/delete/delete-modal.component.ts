import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'delete-modal',
    templateUrl: './delete-modal.component.html',
    styles: []
})
export class DeleteModalComponent<T> {

    @Input() selectedItem: T | undefined;
    @Input() objectSingle: string | undefined;
    @Input() objectSingleLowerCase: string | undefined;
    @Output() closeModal = new EventEmitter<void>();
    @Output() deleteHandler = new EventEmitter<T>();


    close(): void {
        this.closeModal.emit();
    }

    delete(): void {
        console.log(this.selectedItem)
        this.deleteHandler.emit(this.selectedItem);
    }
}
