import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { IUser } from 'src/app/shared/models/user/user.model';


@Component({
  selector: 'inicio-sesion',
  templateUrl: './inicio-sesion.component.html', 
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent implements OnInit {

  public formGroup: FormGroup;
  public user: IUser; 

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sessionInit();
  }

  private sessionInit(): void{
    this.formGroup = this.formBuilder.group({ 
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required]
    })
  }

  private errorMapping (errors: any):string{
    let errorMessage ='';
    if(errors.required){
      errorMessage += 'Campo Obligatorio. ';
    }
    if(errors.email){
      errorMessage +='Debes ingresar un correo electrónico válido';
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


  public inicioSesion ():void{
    const data = this.formGroup.value;
    this.LoginUser(data);
    console.log('inicio sesion exitoso', data);
  }

  private LoginUser(user: IUser) : void {
    this.userService.LoginUser(user).subscribe(
      response => {
        if(response.status === 1){
          this.saveToken(response.token);
          this.router.navigate(['/home']);
        }else{
          this.router.navigate(['/signout']);
        }
      }
    )
  }

  private saveToken(token: string) {
    if(token) {
      localStorage.setItem("token", token);
    }
  }

}
