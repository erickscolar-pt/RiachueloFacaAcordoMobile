import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { CpfCnpjValidator } from 'src/app/shared/directives/Validator/cpf-cnpj-validator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TermosComponent } from 'src/app/shared/components/termos/termos.component';
import { UserVO } from 'src/app/shared/providers/user/user';
import { UserService } from '../../providers/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {
  public userChange: any;

  constructor(
    public dialogRef: MatDialogRef<TermosComponent>,
    @Inject(MAT_DIALOG_DATA) public user: any,
    private userService: UserService,
  ) {
    this.userChange = {
      fullName: new FormControl(user.fullName, []),
      birth: new FormControl(new Date(user.birth), [Validators.required]),
      cpfOrCnpj: new FormControl(
        user.cpfOrCnpj, [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(14),
          CpfCnpjValidator.validate
        ]
      ),
      password: new FormControl('', [Validators.minLength(6)]),
      passwordCheck: new FormControl('', [Validators.minLength(6)]),
      email: new FormControl(user.email, [Validators.email]),
      phone: new FormControl(user.phone, [Validators.maxLength(11)]),
    };
  }

  ngOnInit() {
  }

  public submitIt(user: UserVO) {
    this.userService.put(user)
      .subscribe(data => {
        //console.log(data);
      });
  }

}
