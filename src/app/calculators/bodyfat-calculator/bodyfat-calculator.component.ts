import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { NavyCalculatorService, NavyParameters } from './navy-calculator.service';

@Component({
    selector: 'skoll-bodyfat-calculator',
    templateUrl: './bodyfat-calculator.component.html',
    styleUrls: ['./bodyfat-calculator.component.scss']
})
export class BodyfatCalculatorComponent implements OnInit, OnDestroy {
    public isCalculated = false;
    public bodyfatPercentage: number;
    public suffix: 'cm' | 'in' = 'cm';
    /**
     * Available units for calculation.
     */
    public units: string[] = ['metric', 'imperial'];

    /**
     * Biological sexes used for calculation.
     */
    public sexes: string[] = ['male', 'female'];

    public form = new FormGroup({
        unit: new FormControl('metric', [Validators.required]),
        sex: new FormControl('male', [Validators.required]),
        height: new FormControl('', [Validators.required]),
        neckCircumference: new FormControl('', [Validators.required]),
        abdomenCircumference: new FormControl('', [Validators.required]),
        waistCircumference: new FormControl(''),
        hipCircumference: new FormControl('')
    });

    constructor(private navy: NavyCalculatorService) {}

    public calculate() {
        const params: NavyParameters = {
            height: this.form.controls.height.value,
            neck: this.form.controls.neckCircumference.value,
            abs: this.form.controls.abdomenCircumference.value,
            waist: this.form.controls.waistCircumference.value,
            hips: this.form.controls.hipCircumference.value
        };
        const sex = this.form.controls.sex.value;
        const unit = this.form.controls.unit.value;
        this.bodyfatPercentage = Math.round(this.navy.calculate(params, sex, unit) * 10) / 10;
        this.isCalculated = true;
    }

    ngOnInit() {
        this.form.controls.sex.valueChanges.pipe(untilDestroyed(this)).subscribe(val => {
            if (val === 'female') {
                this.form.controls.waistCircumference.setValidators(Validators.required);
                this.form.controls.hipCircumference.setValidators(Validators.required);
            } else {
                this.form.controls.waistCircumference.clearValidators();
                this.form.controls.hipCircumference.clearValidators();
            }
        });

        this.form.controls.unit.valueChanges.pipe(untilDestroyed(this)).subscribe(val => {
            this.suffix = val === 'metric' ? 'cm' : 'in';
        });
    }

    ngOnDestroy() {}
}
