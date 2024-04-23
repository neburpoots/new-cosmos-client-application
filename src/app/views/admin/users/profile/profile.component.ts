import { Component, Input, Output, EventEmitter } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import dayjs from 'dayjs';
import { AssemblyMultivers } from '../../../../models/entities/assemblyMultivers';
import { AllAssemblyLinesMultiversEntitiesGQL, AllAssemblyMultiversEntitiesGQL, AssemblyLineEntity, AssemblyMultiversByIdGQL, AssemblyMultiversEntity } from '../../../../../generated/graphql';
import { Subject, map, startWith, switchMap } from 'rxjs';
import { AuthService } from '../../../../services/authentication/auth.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.component.html',
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
export class ProfileComponent {

    id: string | null = null;

    faUser = faUser;

    protected refetchTrigger: Subject<void> = new Subject<void>();

    constructor(private route: ActivatedRoute, private toastr: ToastrService, 
        protected authService: AuthService
    ) { }

    // get formattedDate(): string {
    //     return dayjs(this.item?.orderDatum).format('dddd, MMMM D, YYYY');
    // }


}
