import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

export class Helper {
    public static UnitTestImports = [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule
    ];

    /**
     * Iterates through all the controls in the provided FormGroup and marks them as touched.
     *  This will force angular to trigger their validation errors.
     */
    public static validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                Helper.validateAllFormFields(control);
            }
        });
    }
}

export class DateAdapterMock {
    setLocale() {}
}
