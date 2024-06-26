import { Component, Input, Output, EventEmitter } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { AssemblyMultiversLine } from '../../../../models/entities/assemblyMultiversLine';
import { AssemblyLineEntity, AssemblyMultiversEntity } from '../../../../../generated/graphql';

@Component({
    selector: 'assembly-multivers-popover',
    templateUrl: 'assembly-multivers-popover.component.html',
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms ease-out', style({ opacity: 1 })),
            ]),
        ])
    ],
    //   styleUrls: ['./modal.component.css']
})
export class AssemblyMultiversPopoverComponent {
    @Input() assemblyMultiversLines: AssemblyLineEntity[] = [];
    @Input() item: any;
}
