import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Helper } from 'src/app/helper';
import { OneRepMaxCalculatorService } from './one-rep-max-calculator.service';
import { RepMax } from 'src/app/models/rep-max';

@Component({
    selector: 'skoll-one-rep-max-calculator',
    templateUrl: './one-rep-max-calculator.component.html',
    styleUrls: ['./one-rep-max-calculator.component.scss']
})
export class OneRepMaxCalculatorComponent implements OnInit {
    /**
     * Whether a result was calculated
     */
    public isCalculated = false;

    public oneRepMax: number;
    public otherRepMaxes: RepMax[] = [];

    displayedColumns = ['reps', 'weight'];
    /**
     * The form group of the calculator
     */
    public form = new FormGroup({
        weight: new FormControl('', [Validators.required, Validators.min(1)]),
        repetitions: new FormControl('', [
            Validators.required,
            Validators.min(1),
            Validators.max(10)
        ])
    });

    /**
     * Creates an error message based on what error the formControl of repetition has
     */
    public getRepetitionErrorMessage() {
        return this.form.controls.repetitions.hasError('required')
            ? 'You must enter a value'
            : 'Please enter a number between 1 and 10';
    }

    /**
     * Creates an error message based on what error the formControl of weight has
     */
    public getWeightErrorMessage() {
        return this.form.controls.weight.hasError('required')
            ? 'You must enter a value'
            : 'Please lift at least 1.. thing?';
    }

    public calculate() {
        // TODO: notification service
        if (this.form.valid) {
            this.oneRepMax = this.calc.calculateOneRepMax(
                this.form.controls.weight.value,
                this.form.controls.repetitions.value
            );
            this.otherRepMaxes = this.calc.calculateNRepMax(this.oneRepMax);
            this.isCalculated = true;
        } else {
            Helper.validateAllFormFields(this.form);
        }
    }

    constructor(private calc: OneRepMaxCalculatorService) {}

    ngOnInit() {}
}
