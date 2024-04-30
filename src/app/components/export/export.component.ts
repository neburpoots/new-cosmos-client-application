import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Mutation, Query } from 'apollo-angular';
import { TableHead } from '../../models/utils/tableHead';
import { faFileCsv, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { ExportOptions, ExportType, SelectedRows } from '../../models/utils/export';

@Component({
    selector: 'export',
    templateUrl: './export.component.html',
})
export class ExportComponent implements OnInit {

    @Output() closeModal = new EventEmitter<void>();
    @Output() export = new EventEmitter<ExportOptions>();

    step: number = 1;

    exportType = ExportType;
    
    exportColumns: string[] = [];

    selectRows: SelectedRows[] = [
        { title: 'Export all', description: 'Export all of the records', key: 'all', selected: true },
        { title: 'Export shown records', description: 'Export all records currently in the page', key: 'paginated', selected: false },
        { title: 'Export filtered records', description: 'Export all of the records. Uses the global search and other filters', key: 'filtered', selected: false }
    ];

    withHeaders: boolean = true;

    @Input() tableHeaders: TableHead<any>[] = [];

    @Input() data: any[] = [];

    @Input() cellWidths: number[] = [];

    @Input() objectSingle: string = '';
    @Input() objectPlural: string = '';

    faFileCsv = faFileCsv
    faFileExcel = faFileExcel

    constructor(
        protected toastr: ToastrService,


    ) {
    }

    get allIncludedExportHeaders(): TableHead<any>[] {
        const includedHeaders = this.tableHeaders.filter(header => this.exportColumns.includes(header.key));
        return includedHeaders;
    }

    ngOnInit(): void {
        this.exportColumns = this.tableHeaders.map(h => h.key);
    }

    setStep(step: number) {
        this.step = step;
    }

    setExportType(type: 'csv' | 'excel') {
        this.exportType = type;
    }

    setWithHeaders(withHeaders: boolean) {
        this.withHeaders = withHeaders;
    }

    setExportRecords(key: string) {
        this.selectRows = this.selectRows.map(row => {
            if (row.key === key) {
                row.selected = true;
            } else {
                row.selected = false;
            }
            return row;
        });
    }

    async exportData() {

        let object : ExportOptions = {
            type: this.exportType,
            records: this.selectRows.find(row => row.selected)?.key as 'all' | 'paginated' | 'filtered',
            exportHeaders: this.exportColumns,
            withHeaders: this.withHeaders
        }

        this.export.emit(object);
    }

    toggleExportColumn(column: string) {
        if (this.exportColumns.includes(column)) {
            this.exportColumns = this.exportColumns.filter(c => c !== column);
        } else {
            this.exportColumns.push(column);
        }

        console.log(this.exportColumns)
    }

    close(): void {

        this.closeModal.emit();
    }


}
