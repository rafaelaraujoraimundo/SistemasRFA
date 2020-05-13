import { User } from './../user';
import { PoDialogService, PoModalComponent } from '@po-ui/ng-components';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-edit-usuarios',
  templateUrl: './edit-usuarios.component.html',
  styleUrls: ['./edit-usuarios.component.css']
})
export class EditUsuariosComponent implements OnInit {

  usuario: User;

  filiais = [{ value: 'SP-SEDE' }, { value: 'ES-HEUE' }];
  @ViewChild('reactiveFormData', { static: true }) reactiveFormModal: PoModalComponent;

  reactiveForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private poDialog: PoDialogService,
    private route: ActivatedRoute) {

    this.createReactiveForm();
    const nav = this.router.getCurrentNavigation();
    if (nav.extras.state) {
      this.usuario = nav.extras.state.user;
      delete this.usuario.password;
      delete this.usuario.icon;
      delete this.usuario.__v;
      this.reactiveForm.setValue(this.usuario)

    }
  }

  ngOnInit(): void {
  }

  createReactiveForm() {

    this.reactiveForm = this.fb.group({
      firstname: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
      lastname: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
      cargo: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
      fixo: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
      celular: ['', Validators.compose([Validators.required, Validators.min(1)])],
      email: ['', Validators.required],
      filial: ['', Validators.required],
      _id: ['']
    });
  }

  saveForm() {


    const newUser: User = {
      firstname: this.reactiveForm.value.firstname,
      lastname: this.reactiveForm.value.lastname,
      cargo: this.reactiveForm.value.cargo,
      fixo: this.reactiveForm.value.fixo,
      celular: this.reactiveForm.value.celular,
      filial: this.reactiveForm.value.filial,
      email: this.reactiveForm.value.email,
      _id: this.reactiveForm.value._id,
      icon: ['editar', 'excluir', 'changePassword']
    };

    console.log(newUser)

    this.authService.editUser(newUser)
      .subscribe(

        (u) => {
          this.poDialog.alert({
            title: 'Cadastro',
            message: `Cadastro Alterado com sucesso`,
            ok: undefined
          });
          this.router.navigateByUrl('/user/usuarios');
        },
        (err) => {
          console.log('Erro ao criar usuario: ' + err);
        }
      );
  }

}
