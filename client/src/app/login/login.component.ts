import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Login';

  userMsg: string;
  username: string;
  password: string;
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  handleRoute() {
    this.router.navigate(['/register']);
  }

  handleSubmit() {
    this.http.post('/login', {
      username: this.username,
      password: this.password
    }).subscribe((res: any) => {
      if (res.success) {
        this.router.navigate([res.redirect]);
      } else {
        this.userMsg = res.msg;
        this.username = ''; this.password = '';
      }
    });
  }
}
