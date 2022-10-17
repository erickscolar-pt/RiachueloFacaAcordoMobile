import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CpfCnpjValidator } from 'src/app/shared/directives/Validator/cpf-cnpj-validator';
import { User } from 'src/app/shared/providers/user/user';
import { ActivatedRoute, Router } from '@angular/router';
import { authBg, mobileDefault, homeAlt } from 'src/app/shared/providers/background';
import { GoogleAnalyticsService } from 'src/app/shared/google-analytics/google-analytics.service';
import { LoadingService } from 'src/app/shared/providers/loading/loading.service';
import Swal from 'sweetalert2';
import { RegisterService } from '../providers/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnChanges {
  public signUp: any;
  public user: User;
  @Input() public userUpdate: any;
  public bg = authBg;
  public bgMobile = mobileDefault;
  public bgAlt = homeAlt;
  public registerTitle = 'Cadastre-se';

  constructor(
    private routeActived: ActivatedRoute,
    private gaAnalytics: GoogleAnalyticsService,
    private loading: LoadingService,
    public router: Router,
    public registerService: RegisterService,
  ) {
    this.routeActived.url
      .subscribe(data => {
        if (data[0].path === 'admin') {
          this.registerTitle = 'Cadastrar usuário';
        }
      });
    this.routeActived.queryParams.subscribe(params => {
      this.user = {
        cpfOrCnpj : '',
        password : ''
      };
      if (params.cpfOrCnpj) {
        this.user.cpfOrCnpj = params.cpfOrCnpj;
      }
    });
  }

  ngOnInit() {
    this.signUp = {
      fullName: new FormControl('', [Validators.required]),
      cpfOrCnpj: new FormControl(
        this.user.cpfOrCnpj, [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(14),
          CpfCnpjValidator.validate
        ]
      ),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(11)]),
      passwordCheck: new FormControl('', [Validators.required, Validators.minLength(6)])
    };
  }

  ngOnChanges() {
    if (this.userUpdate) {
      this.signUp = this.userUpdate;
    }
  }

  public register(user: User) {
    //user.url = "Riachuelo";
    user.url = "12";
    user.birth = "1111-11-11";
    this.registerService.postRegister(user)
      .subscribe({
        next: response => {
          this.gaAnalytics.eventEmitter('auth', 'cadastro', user.cpfOrCnpj);
          this.loading.stopLoad();
          this.router.navigate(['/login'], {queryParams : {cpfOrCnpj: user.cpfOrCnpj}});
        },
        error: (err) =>{
          this.loading.stopLoad();
        },
        complete: () => {
        }
      });
    }
}
