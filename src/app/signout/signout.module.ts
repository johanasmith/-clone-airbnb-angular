import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignoutComponent } from './signout.component';
import { FormRegisterComponent } from './components/formRegister/form-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignoutRoutingModule } from './signout-routing.module'


@NgModule({
  declarations: [SignoutComponent, FormRegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SignoutRoutingModule
  ]
})
export class SignoutModule { }
