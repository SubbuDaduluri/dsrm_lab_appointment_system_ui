import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { provideToastr } from 'ngx-toastr';
import { AppCommomModule } from './shared/app.common.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideNativeDateAdapter } from '@angular/material/core';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideAnimations(), 
    importProvidersFrom(AppCommomModule),
    provideHttpClient(
      withInterceptorsFromDi(),
    ),
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    provideNativeDateAdapter(),
    importProvidersFrom(NgxMatSelectSearchModule),
    provideCharts(withDefaultRegisterables()), provideCharts(withDefaultRegisterables())

  ]
};
