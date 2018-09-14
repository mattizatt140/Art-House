import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  title: string;
  msg: string;
  msgClass: string;
  form: FormGroup;

  constructor(
    private auth: AuthenticateService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.title = 'Register';
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])],
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
      ])],
    });
  }

  validateEmail(controls) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateEmail': true };
    }
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
    this.router.navigate(['/login']);
  }

  handleSubmit() {
    this.auth.registerUser({
      email: this.form.controls.email.value,
      username: this.form.controls.username.value,
      password: this.form.controls.password.value
    })
    .subscribe((res: any) => {
      if (res.success) {
        this.msg = res.msg;
        this.msgClass = 'alert alert-success';
        setTimeout(() => {
          this.router.navigate([res.redirect]);
        }, 3000);
      } else {
        this.msg = res.msg;
        this.msgClass = 'alert alert-danger';
        this.form.controls.email.setValue('');
        this.form.controls.username.setValue('');
        this.form.controls.password.setValue('');
      }
    });
  }
}
