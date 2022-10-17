
import { Component, Input, OnChanges, Output, EventEmitter, NgZone } from '@angular/core';
/// <reference types="gapi" />
/// <reference path="../../node_modules/@types/gapi/index.d.ts" />
import { FormBuilder, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../providers/user/user';
import { CpfCnpjValidator } from '../../directives/Validator/cpf-cnpj-validator';
import { LoadingService } from '../../providers/loading/loading.service';
import { faIdCard, faKey, faUserCircle, faCalendarAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Tools } from 'src/app/shared/tools';



declare var gapi: any;
declare var gapi2: 'gapi.auth2.GoogleAuth';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnChanges {
  [x: string]: any;
  public userForm: FormGroup;
  public user: User;
  public mask = '000.000.000-009';
  @Input() formTypeStr?: string;
  @Input() formType: any;
  @Output() public userSubmit = new EventEmitter();
  public readonly cpfIcon = faIdCard;
  public readonly pwdIcon = faKey;
  public readonly nameicon = faUserCircle;
  public readonly birthIcon = faCalendarAlt;
  public readonly phoneIcon = faPhone;
  public readonly mailIcon = faEnvelope;
  public tela: boolean = false;
  public validCpfOrCnpj: any;
  public nameRota: any;

  public gapiSetup: boolean = false; // marks if the gapi library has been loaded
  public authInstance: gapi.auth2.GoogleAuth;
  public error: string;
  public userGoogle: gapi.auth2.GoogleUser;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private loading: LoadingService,
    private ngZone: NgZone,
    private tools:Tools
    ) {}

  ngOnChanges() {
    this.userForm = this.fb.group(this.formType);
  }

  /* Ajuste Google API  */
  async ngOnInit() {
    this.tela = false
    if(this.router.url == '/home'){
      //console.log(this.router.url)
      this.nameRota = "Negocie sua dívida Riachuelo"
    } else if(this.router.url == '/login'){
      this.nameRota = "Login"
    } else if(this.router.url == '/register'){
      this.nameRota = "Cadastro"
    } else if(this.router.url == '/debt'){
      this.nameRota = "Meus débitos Riachuelo"
    } else if(this.router.url == '/faq'){
      this.nameRota = "Como Funciona"
    }
    this.tools.setTitle(this.nameRota);

    if(this.router.url !== '/debt;company=12'){
      //console.log('apagando dados do localstorage')
      //localStorage.clear();
    }

    // Caso aparecer o botão google na home, insira a url
    this.validCpfOrCnpj = '/login?cpfOrCnpj=' + this.userForm.controls.cpfOrCnpj.value
    if(this.router.url == '/home' ||
      this.router.url == '/login' ||
      this.router.url == this.validCpfOrCnpj){
      this.tela = true;
    }

    if (await this.checkIfUserAuthenticated()) {
      this.userGoogle = this.authInstance.currentUser.get();
    }
  }

  onKey($event) {
    const cpfOrCnpjLength = this.userForm.controls.cpfOrCnpj.value.length;
    if (cpfOrCnpjLength > CpfCnpjValidator.cpfLength && cpfOrCnpjLength <= CpfCnpjValidator.cnpjLength) {
      this.mask = '00.000.000/0009-00';
    } else {
      this.mask = '000.000.000-009';
    }
  }

  /* Inicio configuração Google API */
  loadClient(): Promise<any> {
    return new Promise((resolve, reject) => {
        this.zone.run(() => {
               gapi.load('client', {
                   callback: resolve,
                   onerror: reject,
                   timeout: 1000, // 5 seconds.
                   ontimeout: reject
               });
        });
   });
}

  async initGoogleAuth(): Promise<void> {
    //  Create a new Promise where the resolve function is the callback
    // passed to gapi.load
    const pload = new Promise((resolve) => {
      gapi.load('auth2',resolve);
    });

    //cliente_id é gerado pela credencial Google
    return pload.then(async () => {
      await gapi.auth2
      /* Chave Google API */
        .init({ client_id: '573877951288-0anfqijr26u13q8r10o88ivcpsvnvabs.apps.googleusercontent.com' })
        .then(auth => {
          this.gapiSetup = true;
          this.authInstance = auth;
        });
    });
  }

  async authenticate(): Promise<gapi.auth2.GoogleUser> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    // Resolve or reject signin Promise
    return new Promise(async () => {
      await this.authInstance.signIn().then(
        user => this.userGoogle = user,
        error => this.error = error);
    });
  }


  async checkIfUserAuthenticated(): Promise<boolean> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    return this.authInstance.isSignedIn.get();
  }
/* Fim config Google API */

  onSubmit() {
    if (this.userForm.get('passwordCheck')) {
      if (this.userForm.get('password').value !== this.userForm.get('passwordCheck').value) {
        this.userForm.get('passwordCheck').setErrors({notEqual: true});
      } else {
        this.userForm.get('passwordCheck').clearValidators();
      }
    }
    if (this.userForm.valid) {
      this.loading.setLoad();
      this.user = this.userForm.value;
      this.userSubmit.emit(this.user);
    }
  }
  private register() {
    this.router.navigate(['/register']);
  }
}
