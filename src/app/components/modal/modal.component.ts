import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalWidth } from './../../models/enums/modalWidth.enum';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'modal-component',
    templateUrl: './modal.component.html',
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms ease-out', style({ opacity: 1 })),
            ]),
        ]),
    ],
    //   styleUrls: ['./modal.component.css']
})
export class ModalComponent {
    @Input() isVisible: boolean = false;
    @Input() width: ModalWidth = ModalWidth.Medium;
    @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
    ModalWidth = ModalWidth; // Expose the enum

    closeModal(): void {
        // this.isVisible = false;
        this.onClose.emit();
    }

    stopPropagation(event: Event): void {
        event.stopPropagation();
    }


}
