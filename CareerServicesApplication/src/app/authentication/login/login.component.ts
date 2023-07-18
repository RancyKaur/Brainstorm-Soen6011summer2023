import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AccountService } from '../accountService.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[MessageService]
})
export class LoginComponent implements OnInit {

  loginForm :FormGroup;
  submitted:Boolean;
  loading: boolean;
  constructor(public formBuilder : FormBuilder,
    private messageService: MessageService,
    private accountService  : AccountService,
    private router: Router,
    private route : ActivatedRoute)
  {

  }
  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({

      'email': [ '', [Validators.email,Validators.required]],
      'password': ['',Validators.required],

    });
    localStorage.removeItem('user');
  }

  verify()
  {
    this.messageService.clear();
    this.messageService.add({  severity: 'success', summary: 'Success' });
    this.messageService.add({  severity: 'warn', summary: 'Warning',});

  }

  onSubmit() {
    this.submitted = true;



    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    //this.commonService.showLoader=true;
    this.accountService.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value)
        .pipe(first())
        .subscribe({
            next: () => {
                // get return url from query parameters or default to home page
                //this.commonService.showLoader =false;
                this.messageService.add({  severity: 'success', summary: 'Login successful' });
                //const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                setTimeout(()=>{
                  this.router.navigate(['/homepage']);

                },1500)

            },
            error: error => {
             // this.commonService.showLoader =false;

              this.messageService.add({  severity: 'warn', summary: 'Invalid username or password',});

                this.loading = false;
            }
        });
}
}
