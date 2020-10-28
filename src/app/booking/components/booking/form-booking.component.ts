import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IBooking } from 'src/app/shared/models/booking/booking.model';
import { BookingService } from 'src/app/services/booking/booking.service';


@Component({
  selector: 'app-form-booking',
  templateUrl: './form-booking.component.html',
  styleUrls: ['./form-booking.component.scss']
})
export class FormBookingComponent implements OnInit {

  public formGroup: FormGroup;
  public initialDate: string;

  constructor(
    private formBuilder: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tomorrow();
    this.bookingInit();
  }

   private bookingInit(): void{
    this.formGroup = this.formBuilder.group({ 
      booking_date_start: ['', Validators.required],
      booking_date_end: ['', Validators.required],
      comments: ['', Validators.required]
    },{
      validators: this.validateDateRange()
    });
  }

  private tomorrow() {
    var today = new Date();
    today.setDate(today.getDate() + 1);
    this.initialDate = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
  }

  private validateDateRange(){
    return (formGroup: FormGroup) => {
      const controlBookingDateStart = formGroup.controls['booking_date_start']
      const controlBookingDateEnd = formGroup.controls['booking_date_end']
      if(new Date(controlBookingDateStart.value) > new Date(controlBookingDateEnd.value)){
          controlBookingDateEnd.setErrors({mustGreaterThan: true})
      }
    }
  }

  private errorMapping (errors: any):string{
    let errorMessage ='';
    if(errors.required){
      errorMessage += 'Campo Obligatorio. ';
    }if(errors.mustGreaterThan){
      errorMessage += 'La Fecha de Reserva Final debe ser mayor o igual que la Fecha de reserva Incial. ';
    }

    return errorMessage;
  }

  public getErrorMessage(ControlName:string):string{
    let error='';
    const control = this.formGroup.get(ControlName);
    if(control.touched && control.errors != null){
      error = this.errorMapping(control.errors);
    }
    return error;
  }

  public registerBooking ():void{
    const data: IBooking = this.formGroup.value;
    this.saveBooking(data);
    console.log('Reserva exitosa', data);
  }

  private saveBooking(booking: IBooking){
    this.route.params.subscribe(params => {
      const id= params.id;
      booking.experience_id= id;
      this.bookingService.bookingRegister(booking).subscribe(
        response => {console.log('Reserva Registrada', response)
      });
    });
  }
}
