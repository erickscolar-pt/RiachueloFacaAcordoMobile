import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TermosComponent } from 'src/app/shared/components/termos/termos.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/shared/providers/loading/loading.service';
import { faIdCard, faUserCircle, faPhone, faEnvelope, faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/pages/login/providers/login.service';

@Component({
  selector: 'app-mail-form',
  templateUrl: './mail-form.component.html',
  styleUrls: ['./mail-form.component.scss']
})
export class MailFormComponent implements OnInit {
  public mailForm: FormGroup;
  public readonly cpfIcon = faIdCard;
  public readonly nameicon = faUserCircle;
  public readonly phoneIcon = faPhone;
  public readonly mailIcon = faEnvelope;
  public readonly msgIcon = faCommentAlt;
  public submitted = false;

  constructor(
    public dialogRef: MatDialogRef<TermosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private loading: LoadingService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loading.acessoClient("Formulario e-mail",localStorage.getItem('cpf')).subscribe() //insert tabela acesso
    this.mailForm = this.fb.group({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(11)]),
      message: new FormControl('', [Validators.required])
    });
  }

  public onSubmit() {
    if (this.mailForm.valid) {
      this.submitted = true;
      this.loading.setLoad();
      this.loginService.postMail(this.mailForm.value)
        .subscribe({
          complete: () => {
            this.loading.stopLoad();
            Swal.fire(
              'Sucesso!',
              'Mensagem enviada com sucesso.',
              'success'
            ).then(() => {
              this.dialogRef.close();
            });
          },
          error: err => {
            this.loading.getErrorCounter(err.error.message + " Path => " + err.error.path + " " + err.error.status).subscribe();
            this.submitted = false;
            this.loading.stopLoad();
          }
        });
    }
  }

}
