import { Component, Input, Output, EventEmitter } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { AssemblyMultiversLine } from '../../../../models/entities/assemblyMultiversLine';

@Component({
    selector: 'assembly-multivers-detail',
    templateUrl: 'assembly-multivers-detail.component.html',
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
export class AssemblyMultiversDetailComponent {
    @Input() assemblyMultiversLine: AssemblyMultiversLine[] = [];
    @Input() item: any;
}
