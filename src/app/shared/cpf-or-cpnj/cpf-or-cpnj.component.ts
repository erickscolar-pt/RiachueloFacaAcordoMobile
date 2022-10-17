import { Component, OnInit, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, Validators } from '@angular/forms';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { CpfCnpjValidator } from '../directives/Validator/cpf-cnpj-validator';

@Component({
  selector: 'app-cpf-or-cpnj',
  templateUrl: './cpf-or-cpnj.component.html',
  styleUrls: ['./cpf-or-cpnj.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CpfOrCpnjComponent),
      multi: true
    }
  ]
})
export class CpfOrCpnjComponent implements ControlValueAccessor {
  public mask = '000.000.000-009';
  public readonly cpfIcon = faIdCard;
  @Output() public cpfOrCnpjChanges = new EventEmitter();
  public cpfOrCnpj = new FormControl(
    '', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(14),
      CpfCnpjValidator.validate
    ]
  );

  constructor() {
    this.cpfOrCnpj.valueChanges.subscribe(val => {
      this.onChange(val);
      this.onTouch(val);
      const cpfOrCnpjLength = this.cpfOrCnpj.value.length;
      if (cpfOrCnpjLength > CpfCnpjValidator.cpfLength && cpfOrCnpjLength <= CpfCnpjValidator.cnpjLength) {
        this.mask = '00.000.000/0009-00';
      } else {
        this.mask = '000.000.000-009';
      }
      this.cpfOrCnpjChanges.emit({
        value: this.cpfOrCnpj.value,
        error: this.cpfOrCnpj.errors
      });
    });
  }

  onChange = (_: any) => { }

  onTouch = (_: any) => { };

  writeValue(value: any): void {
    this.cpfOrCnpj.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

}
