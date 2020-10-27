import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { IUser } from 'src/app/shared/models/user/user.model';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {

  public formGroup: FormGroup;
  public user: IUser; 
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  private formInit(): void{
    this.formGroup = this.formBuilder.group({ 
      nombre: ['', [Validators.required,this.validateName]],
      telefono: ['', [Validators.required, this.validatePhone]],
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['',[Validators.required, Validators.maxLength(16),this.validatePassword]]
    })
  }

  private validatePassword (control: AbstractControl){
    const password = control.value;
    let error = null;
    const er = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if(!er.test(password)){
      error = {customError:'Debes tener al menos una mayuscula, un número y ser minimo de 8 caracteres'};
    }
    return error;
  }

  private validateName (control: AbstractControl){
    const name = control.value;
    let error = null;
    const er = /^[A-Za-zÑñ ]+$/;
    if(!er.test(name)){
      error = {customError:'Debes ingresar solo letras'};
    }
    return error;
    
  }

  private validatePhone (control: AbstractControl){
    const phone = control.value;
    let error = null;
    const er = /^[0-9]+$/;
    if(!er.test(phone)){
      error = {customError:'Debes ingresar solo números'};
    }
    return error;
    
  }

  public getErrorMessage(ControlName:string):string{
    let error='';
    const control = this.formGroup.get(ControlName);
    if(control.touched && control.errors != null){
      error = this.errorMapping(control.errors);
    }
    return error;
  }

  private errorMapping (errors: any):string{
    let errorMessage ='';
    if(errors.required){
      errorMessage += 'Campo Obligatorio. ';
    }
    if(errors.customError){
      errorMessage += errors.customError; 
    }
    if(errors.maxlength){
      errorMessage += `La longitud máxima deber ser ${errors.maxlength.requiredLength}`;
    }
    if(errors.email){
      errorMessage +='Debes ingresar un correo electrónico válido';
    }
    return errorMessage;
  }

  public register ():void{
    const data: IUser = this.formGroup.value;
    this.registerUser(data);
    console.log('data registre', data);
  }

  private registerUser(user: IUser) : void {
    this.userService.userRegister(user).subscribe(
      response => console.log('Usuario Registrado', response.user)
    )
  }
}
