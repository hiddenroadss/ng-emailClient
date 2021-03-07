import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncValidator, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

import { AuthService } from '../auth.service';


@Injectable({
    providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {

    constructor(private authService: AuthService) {}

    validate = (control: FormControl) => {
        const { value } =  control;
        return this.authService.checkUsernameAvailability(value)
            .pipe(
                map(() => null),
                catchError(err => {
                    if (err.error.username) {
                        return of({nonUniqueUsername: true});
                    } else {
                        return of({noConnection: true})
                    }
                })
            )   
    }

}
