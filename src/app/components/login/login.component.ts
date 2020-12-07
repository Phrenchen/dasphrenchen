import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserLogin } from 'src/app/interfaces/UserLogin';

@Component({
  selector: 'dph-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  public nameCtrl = new FormControl('', [Validators.required]);
  public pwdCtrl = new FormControl('', [Validators.required]);
  public loginForm: FormGroup = new FormGroup({
    name: this.nameCtrl,
    password: this.pwdCtrl
  });


  // public loginForm: FormGroup;
  public name: string = 'empty name';
  public password: string = 'empty password';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserLogin
    ) { 
      // this.nameCtrl.setValue(data.name);
      // this.pwdCtrl.setValue(data.password);
    }

  ngOnInit(): void {}

  public performLogin(): void {
    this.dialogRef.close({
      name: this.nameCtrl.value,
      password: this.pwdCtrl.value
    });
  }

  public cancelLogin(): void {
    this.dialogRef.close();
  }
}
