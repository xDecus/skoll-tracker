import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';

@Injectable({
    providedIn: 'root'
})
export class UserSettingsService {
    /**
     * Determines the used date format
     * * WARNING: Setting this value directly will not persist it
     * * Since Angular's change detection and property accessor don't play nicely with each other, i've kept this variable public
     * * Only use it for read access
     */
    public locale: 'de-DE' | 'en-US' = 'de-DE';

    /**
     * Determines the default units used
     * * WARNING: Setting this value directly will not persist it
     * * Since Angular's change detection and property accessor don't play nicely with each other, i've kept this variable public
     * * Only use it for read access
     */
    public unit: 'metric' | 'imperial' = 'metric';

    /**
     * The currently logged in user's unique id, we'll use this to save the user's preferences to the local storage.
     * If he has none, we won't save anything.
     */
    public userId: string = null;

    constructor(private adapter: DateAdapter<any>) {}

    /**
     * Sets the locale and saves it to the local storage if the user is logged in
     */
    public setLocale(locale: 'de-DE' | 'en-US') {
        this.locale = locale;
        this.adapter.setLocale(locale);
        this.saveSettings();
    }

    /**
     * Sets the unit and saves it to the local storage if the user is logged in
     */
    public setUnit(unit: 'metric' | 'imperial') {
        this.unit = unit;
        this.saveSettings();
    }

    /**
     * Initializes the user settings service by retrieving saved data from the local storage
     */
    public initializeUserSettings(user: firebase.User) {
        if (!user) {
            return;
        }
        this.userId = user.uid;

        const settingsString = localStorage.getItem(this.userId);
        // getItem returns null if there's nothing in the storage with that key
        if (settingsString === null) {
            return;
        }

        let settingsObject: any;
        try {
            // Might throw an exception if the settingsString is somehow not valid JSON
            settingsObject = JSON.parse(settingsString);
        } catch {
            console.error(
                '[UserSettingsService] Unable to retrieve user settings because JSON is invalid'
            );
            return;
        }

        this.locale = settingsObject.locale;
        this.unit = settingsObject.unit;
        console.log('[UserSettingsService] Successfully loaded user data.');
    }

    /**
     * Saves the current user settings to the local storage if the user is logged in
     */
    private saveSettings() {
        if (!this.checkUser()) {
            return;
        }

        try {
            localStorage.setItem(
                this.userId,
                JSON.stringify({ locale: this.locale, unit: this.unit })
            );
        } catch (error) {
            // setItem will throw an exception if a) the storage is full or b) the user uses mobile safari and is in private mode
            console.warn(
                '[UserSettingsService] Unable to save user settings because storage is full or browser is in private mode.'
            );
        }
    }

    private checkUser() {
        const userIdSet = this.userId !== null;
        if (!userIdSet) {
            console.log('[UserSettingsService] no user id set -> will not save settings');
        }
        return userIdSet;
    }
}
