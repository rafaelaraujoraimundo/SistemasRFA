import { AuthService } from './../auth.service';
import { User } from './../user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PoButtonComponent, PoInfoModule } from '@po-ui/ng-components';
import { PoTableColumn } from '@po-ui/ng-components';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  users$: Observable<User>;
  columns: Array<PoTableColumn>;
  items: any;


    @ViewChild(PoButtonComponent, { static: true }) button: PoButtonComponent;

  AddUser() {
    this.router.navigateByUrl('user/registro')
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.columns = this.authService.getColumns();
    this.authService.getusers().subscribe( user => {
      this.items = user;
      console.log(this.items); });
  }



}



