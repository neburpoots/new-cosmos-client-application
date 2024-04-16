import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Mutation, Query } from 'apollo-angular';

@Component({
    selector: 'export',
    templateUrl: './export.component.html',
})
export class ExportComponent {

    @Output() closeModal = new EventEmitter<void>();

    @Input() cellWidths: number[] = [];

    @Input() objectSingle: string = '';
    @Input() objectPlural: string = '';

    constructor(
        protected toastr: ToastrService,


    ) {
    }

    close(): void {

        this.closeModal.emit();
    }


}
