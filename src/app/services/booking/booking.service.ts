import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { IBooking } from 'src/app/shared/models/booking/booking.model';
import { IBookingResponse } from './../../shared/models/booking/bookingResponse.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private httpClient: HttpClient) { }

  private handlerError(error: HttpErrorResponse){
    console.error ('Http erros', error);
    return throwError(`Error calling api ${error.message}`);
  }

  public bookingRegister(booking: IBooking): Observable<IBookingResponse> {
    const url = `${​​​​​environment.urlBase}​​​​​/booking`;
    return this.httpClient.post<IBookingResponse>(url,booking).pipe(
      retry(2), catchError(this.handlerError)
    );
  }

}
