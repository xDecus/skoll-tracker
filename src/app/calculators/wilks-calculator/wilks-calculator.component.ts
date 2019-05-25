import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { WilksCalculatorService } from './wilks-calculator.service';
import { RepMax } from 'src/app/models/rep-max';
import { Helper } from 'src/app/helper';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
    selector: 'skoll-wilks-calculator',
    templateUrl: './wilks-calculator.component.html',
    styleUrls: ['./wilks-calculator.component.scss']
})
export class WilksCalculatorComponent implements OnInit, OnDestroy {
    /**
     * Whether a result was calculated
     */
    public isCalculated = false;
    public powerliftingTotal: number;
    public wilksNumber: number;

    public currentUnitSuffix = 'kg';

    /**
     * The this.form group of the calculator
     */
    public form = new FormGroup({
        unit: new FormControl(1, [Validators.required]),
        sex: new FormControl(1, [Validators.required]),
        bodyweight: new FormControl('', [Validators.required]),
        squatWeight: new FormControl('', [Validators.required]),
        squatReps: new FormControl(1, [Validators.required]),
        benchWeight: new FormControl('', [Validators.required]),
        benchReps: new FormControl(1, [Validators.required]),
        deadliftWeight: new FormControl('', [Validators.required]),
        deadliftReps: new FormControl(1, [Validators.required])
    });

    /**
     * Calculates the wilks and the powerlifting total based on user input
     */
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

            const result = this.wilksCalc.calculate(
                [squatMax, benchMax, deadliftMax],
                bodyweight,
                sex,
                unit
            );
            this.isCalculated = true;
            this.wilksNumber = result.wilks;
            this.powerliftingTotal = result.total;
        }
    }

    constructor(public wilksCalc: WilksCalculatorService) {}

    private getRepMaxFromControls(
        weightControl: AbstractControl,
        repsControl: AbstractControl
    ): RepMax {
        return { weight: weightControl.value, reps: repsControl.value };
    }

    ngOnInit() {
        this.form.controls.unit.valueChanges.pipe(untilDestroyed(this)).subscribe(val => {
            switch (val) {
                case 1:
                    this.currentUnitSuffix = 'kg';
                    break;
                case 2:
                    this.currentUnitSuffix = 'lbs';
                    break;
            }
        });
    }

    ngOnDestroy() {}
}
