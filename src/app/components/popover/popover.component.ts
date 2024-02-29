import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalWidth } from '../../models/enums/modalWidth.enum';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'popover-component',
    templateUrl: './popover.component.html',
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
export class PopOverComponent {
    @Input() isVisible: boolean = false;
    @Input() width: ModalWidth = ModalWidth.Medium;
    @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
    ModalWidth = ModalWidth; // Expose the enum

    closeModal(): void {
        console.log(this.width)
        // this.isVisible = false;
        this.onClose.emit();
    }

    stopPropagation(event: Event): void {
        event.stopPropagation();
    }


}
