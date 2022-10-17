import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserVO } from 'src/app/shared/providers/user/user';
import { LoginService } from '../providers/login.service';
import { CpfCnpjValidator } from 'src/app/shared/directives/Validator/cpf-cnpj-validator';
import { background, authBg, homeAlt, mobileDefault } from 'src/app/shared/providers/background';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { GoogleAnalyticsService } from 'src/app/shared/google-analytics/google-analytics.service';
import { LoadingService } from 'src/app/shared/providers/loading/loading.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/providers/user/auth.service';
import { LoginDTO } from '../login-dto';
import { HttpXsrfCookieExtractor } from '@angular/common/http/src/xsrf';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public bg = authBg;
  public bgMobile = mobileDefault;
  public signIn: any;
  public user: User;
  public bgAlt = homeAlt;
  public headers: HttpHeaders;
  public hiddenInput : boolean = false;
  public logado: boolean = false;
  public bloqueado: boolean = false;
  public userVO : UserVO
  public checkErrors : boolean = false;
  public checkSms : boolean = false;
  public checkEmail : boolean = false;
  public retornoBloqueio: any;
  public mail:any;
  public phone;
  public email: any;
  public telefone: any;
  public bloq: boolean;
  public mobileCode: any;
  public mobileCodes: any;
  public codeGroup: FormGroup;
  public mobileActiveBtn: boolean = false;
  private code : string;

  private qtdTryLogins : number = 0;


  constructor(
    private routeActived: ActivatedRoute,
    public router: Router,
    private gaAnalytics: GoogleAnalyticsService,
    private loading: LoadingService,
    private loginService: LoginService,
    private authService: AuthService,
    private formBuilder: FormBuilder

    ) {
      this.routeActived.queryParams.subscribe(params => {
        this.user = {
          cpfOrCnpj : '',
          password : ''
        };
        if (params.cpfOrCnpj) {
          this.user.cpfOrCnpj = params.cpfOrCnpj;
        }
      });
      this.codeGroup = this.formBuilder.group({
        code: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(6)])
      })
    }

  ngOnChanges(){

  }

  ngOnInit() {
    this.logado = false;
    this.bloqueado = false;
    this.signIn = {
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      cpfOrCnpj: new FormControl(
        this.user.cpfOrCnpj, [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(14),
          CpfCnpjValidator.validate
        ]
        )
      }
    }

    onCodeChanged(codemobile: string) {
      //console.log('codigo:' + codemobile)
      this.mobileCodes = codemobile;
    }
  
    // this called only if user entered full code
    onCodeCompleted(codemobile: string) {
      this.mobileCode = codemobile.length;
      //console.log('codigo: ' + this.mobileCode)
      if(this.mobileCode = 6){
        this.mobileActiveBtn = true;
      }
    }

    public login(user: User) {
      const Observer = {
        next: (response) => {
          this.headers = response.headers;
          let teste = this.retornoBloqueio == 'true';
          //console.log('resp: ' + teste)
          if(this.retornoBloqueio === 'true'){
            this.bloq = true;
            this.logado = true;
          } else {
            this.logado = true;
            this.bloq = false;
          }
          if(this.logado == true){
            //console.log('cpf' + localStorage.getItem('cpf'))
            this.loading.acessoClient("token", localStorage.getItem('cpf')).subscribe()//insert tabela acesso
          }
          //console.log('blq => ' + this.bloq + ' logado => ' + this.logado);
        },
        complete: () => {
          this.loading.stopLoad();

        },
        error: (err) => {
          this.loading.getErrorCounter(err).subscribe();
          this.loading.stopLoad();
          this.qtdTryLogins += 1;
          if(this.qtdTryLogins >= 3){
            this.loginService.disableLogin(user.cpfOrCnpj)
              .subscribe(response => {
                this.bloqueado = true;
                //Bloqueia por 15 minutos
                this.loginService.bloqueio(user.cpfOrCnpj, "true").subscribe(ObsBloqueio);
                //console.log(ObsBloqueio)
              })
            }
            Swal.fire({
              title: '<html><p>' + 'Falha de autenticação' + '</p></html>',
              text: err,
              imageUrl: 'assets/img/warning.png'
            });
          }
        };
        const DTO: LoginDTO = {
          login: user.cpfOrCnpj,
          password: user.password
        };

        const ObsBloqueio = {
          next: (response) => {
            //pega json simples {bloqueio: 'true'}
            this.retornoBloqueio = response.bloqueio;
            //Retorna o Email e o Telefone do Cliente
            //para ser utilizado na hora do envio de email e do sms
            if (response.email) {
              this.mail = response.email;
              this.phone = response.telefone;

              this.email = "*******" + this.mail.substr(7);
              this.telefone = "(**)*-****" + this.phone.substr(7);
            }


            ////console.log('=>' + this.email + '<=');
            ////console.log('=>' + this.telefone + '<=');
          },
          complete: () => {
            this.loading.stopLoad();
            if (this.retornoBloqueio === 'true') {
              this.bloqueado = true;
            }
            //console.log('=>' + this.retornoBloqueio + '<=');
          },
          error: (err) => {
            this.loading.stopLoad();

            Swal.fire({
              title: '<html><p>' + 'Login ou senha do Usuário invalido!' + '</p></html>',
              imageUrl: 'assets/img/warning.png'
            });

          }
        };



        localStorage.setItem('cpf', user.cpfOrCnpj);

        //Apenas verifica se está bloquado
        this.loginService.bloqueio(user.cpfOrCnpj, "false").subscribe(ObsBloqueio);

        this.loginService.postLogin(DTO).subscribe(Observer);


      }

      public generatePinSMS(){
        this.loading.setLoad();
        this.hiddenInput = true;
        this.checkSms = true;
        this.checkEmail = false;
        this.loading.acessoClient('pinSms',localStorage.getItem('cpf')).subscribe() //insert tabela acesso
        this.loginService.generatePinSms()
        .subscribe((response)=>{
          this.checkErrors = false;
          let code : HttpHeaders = response.headers
          this.code = code.get('TypeLower').substring(6);
          this.loading.stopLoad();
        },
        (err) => {
          //console.log('erro é ' + err)
        })
      }

      public generatePinEmail(){
        this.loading.setLoad();
        this.hiddenInput = true;
        this.checkEmail = true;
    this.checkSms = false;
    this.loading.acessoClient('pinEmail',localStorage.getItem('cpf')).subscribe() //insert tabela acesso
    this.loginService.generatePin()
    .subscribe((response)=>{
      this.checkErrors = false;
      let code : HttpHeaders = response.headers
      this.code = code.get('TypeLower').substring(6);
      this.loading.stopLoad();
    })
    //console.log(this.code)
  }

  public checkError(){
    this.checkErrors = false;
  }

  public onSubmit(){
    if(this.codeGroup.controls.code.value != null || this.codeGroup.controls.code.value != ''){
      let code = this.codeGroup.controls.code.value;
      let codeMobile = this.mobileCodes;
      let result = this.loginService.comparePin(code, this.code);
      let resultMobile = this.loginService.comparePin(codeMobile, this.code)
      //console.log(resultMobile + ' ' + this.mobileCodes)
      if(result || resultMobile){
        this.authService.setToken(this.headers.get('Authorization'));
        this.gaAnalytics.eventEmitter('auth', 'login', this.user.cpfOrCnpj);
        this.router.navigate(['/debt']);
      } else {
        this.loading.getErrorCounter("CODIGO PIN").subscribe()
        this.codeGroup.controls.code.setErrors;
        this.codeGroup.controls.code.setValue('');
      }
    }

  }

}
