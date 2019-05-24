import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'skoll-one-rep-max-calculator',
    templateUrl: './one-rep-max-calculator.component.html',
    styleUrls: ['./one-rep-max-calculator.component.scss']
})
export class OneRepMaxCalculatorComponent implements OnInit {
    public form = new FormGroup({
        weight: new FormControl('lol', [Validators.required, Validators.min(1)]),
        repetitions: new FormControl(0, [
            Validators.required,
            Validators.min(1),
            Validators.max(10)
        ])
    });

    getRepetitionErrorMessage() {
        return this.form.controls.repetitions.hasError('required')
            ? 'You must enter a value'
            : 'Please enter a number between 1 and 10';
    }

    getWeightErrorMessage() {
        return this.form.controls.weight.hasError('required')
            ? 'You must enter a value'
            : 'Please lift at least 1.. thing?';
    }

    calculate() {
        // TODO: notification service
        if (this.form.invalid) {
            return;
        }
    }

    constructor() {}

    ngOnInit() {}
}
