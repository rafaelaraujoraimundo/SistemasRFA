import { User } from './../user';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoDialogService, PoModalComponent } from '@po-ui/ng-components';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

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
  }

    ngOnInit(): void {
  }

   createReactiveForm() {

    this.reactiveForm = this.fb.group({
      firstname: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
      lastname: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
      cargo: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
      fixo: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
      celular: ['', Validators.compose([Validators.required, Validators.min(1)] )],
      email: ['', Validators.required],
      filial: ['', Validators.required],
      password1: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
      id: ['']
    }, { validator: this.matchingPasswords });
  }

  matchingPasswords(group: FormGroup) {
    if (group) {
      const password1 = group.controls.password1.value;
      const password2 = group.controls.password2.value;
      if (password1 === password2) {
        return null;
      }
    }
    return { matching: false };
  }
  saveForm() {


    const newUser: User = {
      firstname : this.reactiveForm.value.firstname,
      lastname : this.reactiveForm.value.lastname,
      cargo: this.reactiveForm.value.cargo,
      fixo: this.reactiveForm.value.fixo,
      celular: this.reactiveForm.value.celular,
      filial: this.reactiveForm.value.filial,
      email: this.reactiveForm.value.email,
      password: this.reactiveForm.value.password1,

     };


    this.authService.register(newUser)
    .subscribe(
      (u) => {
        this.poDialog.alert({
          title: 'Cadastro',
          message: `Cadastro Realizado com sucesso`,
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
