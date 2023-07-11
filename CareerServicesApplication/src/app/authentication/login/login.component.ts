import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[MessageService]
})
export class LoginComponent implements OnInit {

  loginForm :FormGroup;

  constructor(public formBuilder : FormBuilder,private messageService: MessageService)
  {

  }
  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({

      'email': [ '', Validators.required],
      'password': ['',Validators.required],

    });
  }

  verify()
  {
    this.messageService.clear();
    this.messageService.add({  severity: 'success', summary: 'Success' });
    this.messageService.add({  severity: 'warn', summary: 'Warning',});

  }
}
