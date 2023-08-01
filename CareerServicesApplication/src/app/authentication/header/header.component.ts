import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedInUser: any;

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('user')!) || [];

  }
}
