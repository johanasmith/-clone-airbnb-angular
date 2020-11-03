import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBooking } from 'src/app/shared/models/booking/booking.model';
import { BookingService } from 'src/app/services/booking/booking.service';


@Component({
  selector: 'app-form-booking',
  templateUrl: './form-booking.component.html',
  styleUrls: ['./form-booking.component.scss']
})
export class FormBookingComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private router: Router
  ) {     
  }

  ngOnInit(): void {    
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

  tomorrow() {
    var today = new Date();
    today.setDate(today.getDate() + 1);
    let todayDate = today.getDate();
    let todayMonth = (today.getMonth()+1);
    return  (today.getFullYear() 
          + '-' 
          + (todayMonth < 10 ? ("0" + todayMonth) : todayMonth) 
          + '-' 
          + (todayDate < 10 ? ("0" + todayDate) : todayDate));
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
    }if(errors.initialMustGreaterThan){
      errorMessage += 'La Fecha de Reserva Inicial debe ser mayor a la fecha actual';
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
    alert('Reserva exitosa');
    this.router.navigate(['/home']);
  }

  private saveBooking(booking: IBooking){
    this.route.params.subscribe(params => {
      const id= params.id;
      booking.experience_id= id;
      booking.user_id = localStorage.getItem('token');
      this.bookingService.bookingRegister(booking).subscribe(
        response => {console.log('Reserva Registrada', response)
      });
    });
  }
}
