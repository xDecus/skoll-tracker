import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
    title = 'skoll-tracker';
    mobileQuery: MediaQueryList;

    Mainlinks = [
        { label: 'Wilks Calculator', target: '/calculators/wilks', icon: 'list' },
        { label: 'One Rep Max Calculator', target: '/calculators/1rm', icon: 'star' },
        { label: 'TDEE Calculator', target: '/calculators/tdee', icon: 'directions_run' }
    ];
    optionLinks = [
        { label: 'Settings', target: '/settings', icon: 'settings' },
        { label: 'Help & FAQs', target: '/help', icon: 'help' },
        { label: 'Logout', target: '/logout', icon: 'exit_to_app' }
    ];

    private _mobileQueryListener: () => void;
    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}
