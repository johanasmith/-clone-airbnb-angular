import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import {SharedModule} from './shared/shared.module'
import { AppComponent } from './app.component';
import { BookingModule } from './booking/booking.module';
import { HomeModule } from './home/home.module';
import { DetailModule } from './detail/detail.module';
import { SigninModule } from './signin/signin.module';
import { SignoutModule } from './signout/signout.module';
import { AuthInterceptorService } from './services/auth-interceptor/auth-interceptor.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    DetailModule,
    SigninModule,
    SignoutModule,
    BookingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
