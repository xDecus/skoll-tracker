import { TestBed } from '@angular/core/testing';

import { UserSettingsService } from './user-settings.service';

describe('UserSettingsService', () => {
    let service: UserSettingsService;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.get(UserSettingsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should persist values', () => {
        service.userId = 'test';
        localStorage.clear();

        service.setLocale('us');
        service.setUnit('imperial');
        expect(service.locale).toBe('us');
        expect(service.unit).toBe('imperial');

        service.locale = 'de';
        service.unit = 'metric';

        service.initializeUserSettings(<any>{ uid: 'test' });
        expect(service.locale).toBe('us');
        expect(service.unit).toBe('imperial');
    });
});
