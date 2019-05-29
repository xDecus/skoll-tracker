import { TestBed } from '@angular/core/testing';

import { UserSettingsService } from './user-settings.service';
import { DateAdapter } from '@angular/material/core';
import { DateAdapterMock } from './helper';

describe('UserSettingsService', () => {
    let service: UserSettingsService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: DateAdapter, useClass: DateAdapterMock }]
        });
        service = TestBed.get(UserSettingsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should persist values', () => {
        service.userId = 'test';
        localStorage.clear();

        service.setLocale('en-US');
        service.setUnit('imperial');
        expect(service.locale).toBe('en-US');
        expect(service.unit).toBe('imperial');

        service.locale = 'de-DE';
        service.unit = 'metric';

        service.initializeUserSettings(<any>{ uid: 'test' });
        expect(service.locale).toBe('en-US');
        expect(service.unit).toBe('imperial');
    });
});
