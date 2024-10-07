import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";
import { AuthResponseToken } from "../models/auth-response-token";
import { StorageService } from "../services/storage.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService,
        private storageService: StorageService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // except for /login endpoint
        if (request.url.includes('/login')) {
            return next.handle(request);
        }
        // add auth header with jwt if user is logged in and request is to the api url
        let isLoggedIn: boolean = this.storageService.isLoggedIn();
        if (isLoggedIn) {
            let authResponse = this.storageService.getUser();
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${authResponse?.access_token}`
                }
            });
        }
        return next.handle(request);
    }
}