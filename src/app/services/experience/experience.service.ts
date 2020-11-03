import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { IExperienceResponse } from 'src/app/shared/models/experiencesResponse.model';
import { IExperiencesResponseTop5 } from 'src/app/shared/models/experiencesResponseTop5.model';
import { IExperienceDetailResponse } from 'src/app/shared/models/experienceDetailResponse.model';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  //private urlAPI: string = 'http://bankairbnbapp.herokuapp.com';

  constructor(private httpClient: HttpClient) { }

  private handlerError(error: HttpErrorResponse){
    console.error ('Http erros', error);
    return throwError(`Error calling api ${error.message}`);
  }

  public getExperience(): Observable<IExperienceResponse>{
    const url = `${​​​​​environment.urlBase}​​​​​/experiences`;
    return this.httpClient.get<IExperienceResponse>(url).pipe(
      retry(2), catchError(this.handlerError)
    );
  }

  public getExperienceTop5(): Observable<IExperiencesResponseTop5>{
    const url = `${environment.urlBase}​​​​​/experiences/top5`;
    return this.httpClient.get<IExperiencesResponseTop5>(url).pipe(
      retry(2), catchError(this.handlerError)
    );
  }

  public getExperienceById (id: string): Observable<IExperienceDetailResponse> {
    const url = `${​​​​​environment.urlBase}​​​​​/experiences/detail/${id}`;
    return this.httpClient.get<IExperienceDetailResponse>(url).pipe(
      retry(2), catchError(this.handlerError)
    );
  }
}
