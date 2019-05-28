import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuth } from '@angular/fire/auth';
import { DateAdapter } from '@angular/material';
class AngularFireAuthMock extends AngularFireAuth {
    public login() {}
    public logout() {}
}

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, MaterialModule, NoopAnimationsModule],
            declarations: [AppComponent],
            providers: [
                { provide: AngularFireAuth, use: AngularFireAuthMock },
                { provide: DateAdapter, use: {} }
            ]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});
