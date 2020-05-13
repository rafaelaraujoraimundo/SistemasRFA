import { Router } from '@angular/router';
import { PoTableColumn, PoDialogService } from '@po-ui/ng-components';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly url = 'http://localhost:3000/auth';
  private subjUser$: BehaviorSubject<User> = new BehaviorSubject(null);
  private subJLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private http: HttpClient, private router: Router,private poAlert: PoDialogService ) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, user);
  }

  login(credentials: { email: string, password: string }): Observable<User> {
    return this.http
      .post<User>(`${this.url}/login`, credentials)
      .pipe(
        tap((u: User) => {
          localStorage.setItem('token', u.token);
          this.subJLoggedIn$.next(true);
          this.subjUser$.next(u);

        })
      );

  }

  isAutjenticated(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (token && !this.subJLoggedIn$.value) {
      return this.checkTokenValidation();
    }
    return this.subJLoggedIn$.asObservable();
  }

  checkTokenValidation(): Observable<boolean> {
    return this.http
      .get<User>(`${this.url}/user`)
      .pipe(
        tap((u: User) => {
          if (u) {
            localStorage.setItem('token', u.token);
            this.subJLoggedIn$.next(true);
            this.subjUser$.next(u);
          }
        }),
        map((u: User) => (u) ? true : false),
        catchError((err) => {
          this.logout();
          return of(false);
        })
      );
  }

  getuser(): Observable<User> {
    return this.subjUser$.asObservable();
  }

  logout() {
    localStorage.removeItem('token');
    this.subJLoggedIn$.next(false);
    this.subjUser$.next(null);
  }

  getusers(): Observable<User> {
    return this.http
      .get<User>(`${this.url}/userAll`);
  }



  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'firstname' },
      { property: 'lastname' },
      { property: 'email' },
      { property: 'cargo', visible: false },
      { property: 'filial' },
      { property: 'fixo', label: 'Telefone Fixo' },
      { property: 'celular', label: 'Telefone Celular', visible: false },
      { property: 'id', label: 'Codigo', width: '15%', visible: false },
      {
        property: 'icon',
        label: 'Actions',
        type: 'icon',
        icons: [
          {
            action: this.editIcon.bind(this),
            icon: 'po-icon po-icon-edit',
            tooltip: 'Edita o usuario selecionado',
            value: 'editar'
          },
          {
            action: this.delIcon.bind(this),
            icon: 'po-icon-user-delete',
            tooltip: 'Exclui o usuario selecionado',
            value: 'excluir'
          }
        ]
      }
    ];
  }

  editIcon(row) {
    this.router.navigateByUrl('/user/usuarios/editar', {
      state: { user: row }
    })
  }

  delIcon(row) {
     this.poAlert.confirm({
        literals: { confirm: 'Sim', cancel: 'Não' },
        title: 'Exclusão de Usuarios',
        message: 'Deseja excluir o usuario: ' + row.email,
        confirm: () => this.delUser(row),
        cancel: () => {}
      });
     }

  editUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/editar`, user);
  }
  delUser(user: User) {
    console.log(user);
    console.log(`${this.url}/excluir`)
    this.http.post<User>(`${this.url}/excluir`, user).subscribe();
  }

}
