import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { WilksCalculatorService } from './wilks-calculator.service';
import { RepMax } from 'src/app/models/rep-max';
import { Helper } from 'src/app/helper';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { TotalCalculatorService } from './total-calculator.service';
import { IPFCalculatorService } from './ipf-calculator.service';

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
    /**
     * The calculated powerlifting total (S,B,D)
     */
    public powerliftingTotal: number;

    /**
     * The calculated wilks score of the lifter
     */
    public wilksNumber: number;

    /**
     * The calculated IPF points of the lifter
     */
    public ipfPoints: number;

    /**
     * The current unit suffix based on the selected unit
     */
    public currentUnitSuffix: 'kg' | 'lbs' = 'kg';

    /**
     * Available units for calculation.
     */
    public units: string[] = ['metric', 'imperial'];

    /**
     * Biological sexes used for calculation.
     */
    public sexes: string[] = ['male', 'female'];

    /**
     * Different equipment types for IPF point calculation
     */
    public equipment: string[] = ['raw', 'equipped'];

    /**
     * The form group of the calculator
     */
    public form = new FormGroup({
        unit: new FormControl('metric', [Validators.required]),
        sex: new FormControl('male', [Validators.required]),
        bodyweight: new FormControl('', [Validators.required]),
        equipment: new FormControl('raw', [Validators.required]),
        squatWeight: new FormControl('', [Validators.required]),
        squatReps: new FormControl(1, [Validators.required]),
        benchWeight: new FormControl('', [Validators.required]),
        benchReps: new FormControl(1, [Validators.required]),
        deadliftWeight: new FormControl('', [Validators.required]),
        deadliftReps: new FormControl(1, [Validators.required])
    });

    /**
     * Calculates the wilks, ipf points and the powerlifting total based on user input
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
            const equipment = this.form.controls.equipment.value;

            this.powerliftingTotal = this.totalCalc.getSBDTotalFromRepMaxes([
                squatMax,
                benchMax,
                deadliftMax
            ]);
            this.wilksNumber = this.wilksCalc.calculate(
                this.powerliftingTotal,
                bodyweight,
                sex,
                unit
            );
            this.ipfPoints = this.ipfCalc.calculate(
                this.powerliftingTotal,
                bodyweight,
                sex,
                unit,
                equipment
            );

            this.isCalculated = true;
        }
    }

    constructor(
        private wilksCalc: WilksCalculatorService,
        private totalCalc: TotalCalculatorService,
        private ipfCalc: IPFCalculatorService
    ) {}

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
