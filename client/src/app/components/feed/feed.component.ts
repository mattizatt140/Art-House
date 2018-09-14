import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  isLoaded: boolean;

  constructor(private router: Router, private authenticate: AuthenticateService) {
    this.isLoaded = false;

    this.authenticate.isLoggedIn()
    .subscribe((res: any) => {
      if (!res) {
        this.router.navigate(['/']);
      }
      this.isLoaded = true;
    });
  }

  ngOnInit() {}
}
