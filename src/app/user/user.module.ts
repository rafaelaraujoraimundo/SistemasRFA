import { EditUsuariosComponent } from './edit-usuarios/edit-usuarios.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { RegistroComponent } from './registro/registro.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoModule, PoInfoModule } from '@po-ui/ng-components';
import { PoPageLoginModule, PoTemplatesModule } from '@po-ui/ng-templates';
import { PoTableModule } from '@po-ui/ng-components';


@NgModule({
  declarations: [LoginComponent, RegistroComponent, ListaUsuariosComponent, EditUsuariosComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PoModule,
    PoPageLoginModule,
    PoTemplatesModule,
    PoTableModule,
    PoInfoModule
  ]
})
export class UserModule { }
