import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { PoDialogService } from '@po-ui/ng-components';
import { PoPageLogin } from '@po-ui/ng-templates';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;

  constructor(private router: Router,
              private poDialog: PoDialogService,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(formData: PoPageLogin) {
    const credentials = { email: formData.login, password: formData.password };
    this.loading = true;
    this.authService.login(credentials)
      .subscribe(user => {
        console.log(user);
        this.router.navigateByUrl('/user/usuarios');
        this.loading = false;
      },
        err => {
          console.log(err)
          this.poDialog.alert({
            ok: () => this.loading = false,
            title: 'Senha ou usuario invalidos',
            message: 'Favor verificar os dados digitados'
          });
          this.loading = false;
        }
      );
}

}
