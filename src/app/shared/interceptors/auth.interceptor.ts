import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

const excludedUrls: string[] = [
    '/auth',
]

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

    const shouldSkip = excludedUrls.some(url => req.url.includes(url))

    if (shouldSkip) {
        return next(req);
    }

    let session = JSON.parse(localStorage.getItem("session") || "{'accessToken': ''}")

    console.log('Agregando token: ' + session.accessToken);

    const reqWithHeaders = req.clone({
        setHeaders: {
            Authorization: `Bearer ${session.accessToken}`
        }
    })
    return next(reqWithHeaders);
};