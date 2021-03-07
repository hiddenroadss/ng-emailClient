import { Injectable} from '@angular/core';
import { Validator, FormGroup} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class MatchPassword implements Validator {
    validate(formGroup: FormGroup) {
        if (formGroup.value.password === formGroup.value.passwordConfirmation) {
            return null;
        } else {
            return { passwordsDontMatch: true};
        }
    }
}
