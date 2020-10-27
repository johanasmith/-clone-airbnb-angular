import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin.component';
import { SigninRoutingModule } from './signin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';


@NgModule({
  declarations: [SigninComponent, InicioSesionComponent],
  imports: [
    CommonModule,
    SigninRoutingModule,
    ReactiveFormsModule
  ]
})
export class SigninModule { }
