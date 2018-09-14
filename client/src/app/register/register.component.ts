import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = 'Register';

  userMsg: string;
  email: string;
  username: string;
  password: string;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {

  }

  handleRoute() {
    this.router.navigate(['/login']);
  }

  handleSubmit() {
    this.http.post('/register', {
      username: this.username,
      password: this.password
    }).subscribe((res: any) => {
      if (res.success) {
        this.router.navigate([res.redirect]);
      } else {
        this.userMsg = res.msg;
        this.email = ''; this.username = ''; this.password = '';
      }
    });
  }
}
