import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import {  IUser } from './../../shared/models/user/user.model';
import {  IUserResponse } from './../../shared/models/user/userResponse.model';
import {  IUserAuthResponse } from './../../shared/models/user/userAuthResponse.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  
  public isLoggedUser(): boolean{
     return localStorage.getItem('token') ? true: false;
  }

  private handlerError(error: HttpErrorResponse){
    console.error ('Http erros', error);
    return throwError(`Error calling api ${error.message}`);
  }

  public userRegister(user: IUser): Observable<IUserResponse>{
    const url = `${​​​​​environment.urlBase}​​​​​/users/signup`;
    return this.httpClient.post<IUserResponse>(url,user).pipe(
      retry(2), catchError(this.handlerError)
    );
  }

  public LoginUser(user: IUser): Observable<IUserAuthResponse>{
    const url = `${​​​​​environment.urlBase}​​​​​/users/login`;
    return this.httpClient.post<IUserAuthResponse>(url,user).pipe(
      retry(2), catchError(this.handlerError)
    );
  }

}
