import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking.component';
import { BookingRoutingModule } from './booking-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBookingComponent } from './components/booking/form-booking.component';


@NgModule({
  declarations: [BookingComponent, FormBookingComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    ReactiveFormsModule
  ]
})
export class BookingModule { }
