import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Art House';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  handleSignUp(): void {
    this.router.navigate(['/register']);
  }

  handleLogin(): void {
    this.router.navigate(['/login']);
  }
}
