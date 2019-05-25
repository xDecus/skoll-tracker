import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { WilksCalculatorService } from './wilks-calculator.service';
import { RepMax } from 'src/app/models/rep-max';
import { OneRepMaxCalculatorService } from '../one-rep-max-calculator/one-rep-max-calculator.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { Helper } from 'src/app/helper';

@Component({
    selector: 'skoll-wilks-calculator',
    templateUrl: './wilks-calculator.component.html',
    styleUrls: ['./wilks-calculator.component.scss']
})
export class WilksCalculatorComponent implements OnInit {
    /**
     * Whether a result was calculated
     */
    public isCalculated = false;

    /**
     * The this.form group of the calculator
     */
    public form = new FormGroup({
        unit: new FormControl(1, [Validators.required]),
        sex: new FormControl(1, [Validators.required]),
        bodyweight: new FormControl('', [Validators.required]),
        squatWeight: new FormControl('', [Validators.required]),
        squatReps: new FormControl('', [Validators.required]),
        benchWeight: new FormControl('', [Validators.required]),
        benchReps: new FormControl('', [Validators.required]),
        deadliftWeight: new FormControl('', [Validators.required]),
        deadliftReps: new FormControl('', [Validators.required])
    });

    public calculate() {
        if (!this.form.valid) {
            Helper.validateAllFormFields(this.form);
        } else {
            const squatMax: RepMax = this.getRepMaxFromControls(
                this.form.controls.squatWeight,
                this.form.controls.squatReps
            );
            const benchMax: RepMax = this.getRepMaxFromControls(
                this.form.controls.benchWeight,
                this.form.controls.benchReps
            );
            const deadliftMax: RepMax = this.getRepMaxFromControls(
                this.form.controls.deadliftWeight,
                this.form.controls.deadliftReps
            );

            const bodyweight = this.form.controls.bodyweight.value;
            const sex = this.form.controls.sex.value;
            const unit = this.form.controls.unit.value;

            const total = this.wilks.calculate(
                [squatMax, benchMax, deadliftMax],
                bodyweight,
                sex,
                unit
            );
        }
    }

    constructor(public wilks: WilksCalculatorService) {}

    private getRepMaxFromControls(
        weightControl: AbstractControl,
        repsControl: AbstractControl
    ): RepMax {
        return { weight: weightControl.value, reps: repsControl.value };
    }

    ngOnInit() {}
}
