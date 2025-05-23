import * as i0 from '@angular/core';
import { Inject, Injectable, Component, NgModule } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import * as i1 from '@angular/common/http';

class TppLibRefreshService {
    constructor(config, _http) {
        this.config = config;
        this._http = _http;
        // port_credenciales
        this.refreshTokenInProgress = false;
        this.refreshTokenSubject = new BehaviorSubject(null);
        // this.port_credenciales=config.url//"https://7wm9bk5qsj.execute-api.us-east-1.amazonaws.com/dev"
    }
    intercept(req, next) {
        const token = localStorage.getItem('idToken');
        if (!token) {
            return next.handle(req);
        }
        // const headers =
        return next.handle(this.addToken(req)).pipe(catchError((err) => {
            if (err.status === 401) {
                return this.handle401(req, next);
                // return this.refresh(req,next)
            }
            return throwError(() => err);
        }));
    }
    handle401(req, next) {
        if (this.refreshTokenInProgress) {
            return this.refreshTokenSubject.pipe(filter((result) => result !== null), take(1), switchMap(() => next.handle(this.addToken(req))));
        }
        else {
            this.refreshTokenInProgress = true;
            this.refreshTokenSubject.next(null);
            return this.refresh().pipe(switchMap((token) => {
                this.setDataToken(token);
                this.refreshTokenInProgress = false;
                return next.handle(this.addToken(req));
            }));
        }
    }
    addToken(req) {
        const token = localStorage.getItem('idToken');
        return req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
    }
    refresh() {
        let refreshToken = { refreshToken: localStorage.getItem('refreshToken') };
        return this._http.post(this.config.url + '/oauth/refresh', refreshToken);
    }
    setDataToken(data) {
        let resp = data;
        let usuario_inicio = resp;
        let tokenData = usuario_inicio.tokenData;
        // token
        localStorage.setItem('accessToken', tokenData.accessToken);
        localStorage.setItem('expiresIn', tokenData.expiresIn);
        localStorage.setItem('tokenType', tokenData.tokenType);
        // localStorage.setItem("refreshToken",tokenData.refreshToken);
        localStorage.setItem('idToken', tokenData.idToken);
        // decode idToken
        localStorage.setItem('finishToken', this.expireToken());
        localStorage.setItem('initToken', this.initToken());
    }
    expireToken() {
        const token = localStorage.getItem('idToken');
        let base64Url = token.split('.')[1];
        let decodedValue = JSON.parse(window.atob(base64Url));
        return decodedValue.exp;
    }
    initToken() {
        const token = localStorage.getItem('idToken');
        let base64Url = token.split('.')[1];
        let decodedValue = JSON.parse(window.atob(base64Url));
        return decodedValue.iat;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: TppLibRefreshService, deps: [{ token: 'config' }, { token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: TppLibRefreshService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: TppLibRefreshService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: ['config']
                }] }, { type: i1.HttpClient }] });

class TppLibRefreshComponent {
    constructor() { }
    ngOnInit() { }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: TppLibRefreshComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.13", type: TppLibRefreshComponent, isStandalone: true, selector: "lib-tpp-lib-refresh", ngImport: i0, template: ` <p>tpp-lib-refresh works!</p> `, isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: TppLibRefreshComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-tpp-lib-refresh', template: ` <p>tpp-lib-refresh works!</p> `, standalone: true }]
        }], ctorParameters: () => [] });

class TppLibRefreshModule {
    static forRoot(config) {
        return {
            ngModule: TppLibRefreshModule,
            providers: [
                TppLibRefreshService,
                { provide: 'config', useValue: config },
            ],
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: TppLibRefreshModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.13", ngImport: i0, type: TppLibRefreshModule, imports: [TppLibRefreshComponent], exports: [TppLibRefreshComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: TppLibRefreshModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: TppLibRefreshModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [TppLibRefreshComponent],
                    exports: [TppLibRefreshComponent]
                }]
        }] });

/*
 * Public API Surface of tpp-lib-refresh
 */

/**
 * Generated bundle index. Do not edit.
 */

export { TppLibRefreshComponent, TppLibRefreshModule, TppLibRefreshService };
//# sourceMappingURL=tpp-lib-refresh.mjs.map
