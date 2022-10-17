import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { authBg, mobileDefault, homeAlt } from 'src/app/shared/providers/background';
import { LoadingService } from 'src/app/shared/providers/loading/loading.service';
import { PasswordRecoverService } from '../providers/password-recover.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-recover',
  templateUrl: './password-recover.component.html',
  styleUrls: ['./password-recover.component.scss']
})

export class PasswordRecoverComponent implements OnInit {
  public bg = authBg;
  public bgMobile = mobileDefault;
  public prForm: FormGroup;
  public bgAlt = homeAlt;

  constructor(
    private loading: LoadingService,
    private fb: FormBuilder,
    private passwordRecoverService: PasswordRecoverService,
    private router: Router
  ) { }

  ngOnInit() {
    this.prForm = this.fb.group({
      cpfOrCnpj: new FormControl()
    });
  }

  onSubmit() {
    if (this.prForm.valid) {
      this.loading.setLoad();
      this.passwordRecoverService.patchPassword(this.prForm.get('cpfOrCnpj').value, 'facaacordo')
        .subscribe({
          complete: () => {
            this.loading.stopLoad();
            Swal.fire(
              'Sucesso!',
              'Senha enviada para o seu e-mail cadastrado.',
              'success'
            ).then(() => {
              this.router.navigate(['/login']);
            });
          },
          error: (err) => {
            this.loading.stopLoad();
           /* if (err.status == 404) {
              Swal.fire(
                'Ops...',
                'E-mail não encontrado.',
                'error'
              );
            }*/
          }
        });
    }
  }

  cpfChanges(event) {
    this.prForm.get('cpfOrCnpj').setValue(event.value);
    this.prForm.get('cpfOrCnpj').setErrors(event.error);
  }

}
