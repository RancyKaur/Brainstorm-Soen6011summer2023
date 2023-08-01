import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedInUser: any;

  constructor(private router :Router)
  {

  }
  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('user')!) || [];

  }

  redirect()
  {
    this.router.navigate(['/homepage']);
  }
}
