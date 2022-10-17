import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator } from '@angular/forms';
import { CpfCnpjValidator } from './cpf-cnpj-validator';

@Directive({
  selector: '[appCpfCnpj][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CpfCnpjDirective,
    multi: true
  }]
})
export class CpfCnpjDirective extends CpfCnpjValidator implements Validator{}
