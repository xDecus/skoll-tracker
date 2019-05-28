import { Component, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { UserSettingsService } from './user-settings.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        public fireAuth: AngularFireAuth,
        private userSettings: UserSettingsService
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    mobileQuery: MediaQueryList;

    mainFeatureLinks = [{ label: 'Weight Manager', target: '/weight-manager', icon: 'face' }];
    calculatorLinks = [
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

    ngOnInit() {
        this.userSettings.initializeUserSettings(this.fireAuth.auth.currentUser);
    }
    public login() {
        this.fireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(val => {
            console.log(`Successfully logged in as ${val.user.displayName}`);
            this.userSettings.initializeUserSettings(val.user);
        });
    }

    public logout() {
        this.fireAuth.auth.signOut();
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}
