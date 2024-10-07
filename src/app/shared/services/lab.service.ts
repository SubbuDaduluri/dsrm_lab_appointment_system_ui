import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { AppLabResponse } from '../../core/models/app.lab.response';
import { AppLabRequest } from '../../core/models/app.lab.request';

@Injectable({
  providedIn: 'root'
})
export class LabService {

  private apiURL = "http://localhost:8086/api/v1/gateway";

  private existLabInfo$ = new BehaviorSubject<any>({});
  selectedLabInfo$ = this.existLabInfo$.asObservable();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  setLabInfo(labInfo: any) {
    this.existLabInfo$.next(labInfo);
  }



  getAll(): Observable<AppLabResponse[]> {
    return this.httpClient.get<AppLabResponse[]>(this.apiURL + '/labs');
  }

  create(appLabRequest: AppLabRequest): Observable<AppLabResponse> {
    let lat = appLabRequest?.latitude;
    let lng = appLabRequest?.longitude;
    appLabRequest.latitude = parseFloat(lat!.toFixed(7));
    appLabRequest.longitude = parseFloat(lng!.toFixed(7));
    return this.httpClient.post<AppLabResponse>(this.apiURL + '/labs', JSON.stringify(appLabRequest), this.httpOptions);
  }

  partnerRegistration(appLabRequest: AppLabRequest): Observable<AppLabResponse> {
    let lat = appLabRequest?.latitude;
    let lng = appLabRequest?.longitude;
    appLabRequest.latitude = parseFloat(lat!.toFixed(7));
    appLabRequest.longitude = parseFloat(lng!.toFixed(7));
    return this.httpClient.post<AppLabResponse>(this.apiURL + '/labs/partner_signup', JSON.stringify(appLabRequest), this.httpOptions);
  }


  find(id: number): Observable<any> {
    return this.httpClient.get(this.apiURL + '/labs/' + id);
  }
  update(id: number, appLabRequest: AppLabRequest): Observable<AppLabResponse> {
    return this.httpClient.put<AppLabResponse>(this.apiURL + '/labs/' + id, JSON.stringify(appLabRequest), this.httpOptions);
  }
  delete(id: number) {
    return this.httpClient.delete(this.apiURL + '/labs/' + id, this.httpOptions);
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
