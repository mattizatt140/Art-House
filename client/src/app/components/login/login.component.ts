import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  title: string;
  msg: string;
  form: FormGroup;

  constructor(
    private auth: AuthenticateService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.title = 'Login';
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(18),
        this.validateUsername
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(35),
        this.validatePassword
      ])]
    });
  }

  validateUsername(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateUsername': true };
    }
  }

  validatePassword(controls) {
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{7,35}$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validatePassword': true };
    }
  }

  handleRoute() {
    this.router.navigate(['/register']);
  }

  handleSubmit() {
    this.auth.loginUser({
      username: this.form.controls.username.value,
      password: this.form.controls.password.value
    }).subscribe((res: any) => {
      if (res.success) {
        this.router.navigate([res.redirect]);
      } else {
        this.msg = res.msg;
        this.form.controls.username.setValue('');
        this.form.controls.password.setValue('');
      }
    });
  }
}
