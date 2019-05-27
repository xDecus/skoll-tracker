import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
    mobileQuery: MediaQueryList;

    Mainlinks = [
        { label: 'Total Calculator', target: '/calculators/wilks', icon: 'list' },
        { label: 'One Rep Max Calculator', target: '/calculators/1rm', icon: 'star' },
        { label: 'TDEE Calculator', target: '/calculators/tdee', icon: 'directions_run' },
        { label: 'Bodyfat Calculator', target: '/calculators/bodyfat', icon: 'accessibility' }
    ];
    optionLinks = [
        { label: 'Settings', target: '/settings', icon: 'settings' },
        { label: 'Help & FAQs', target: '/help', icon: 'help' }
    ];

    private _mobileQueryListener: () => void;

    constructor(
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        public fireAuth: AngularFireAuth
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    public login() {
        this.fireAuth.auth
            .signInWithPopup(new auth.GoogleAuthProvider())
            .then(val => console.log(val.user.email));
    }

    public logout() {
        this.fireAuth.auth.signOut();
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}
