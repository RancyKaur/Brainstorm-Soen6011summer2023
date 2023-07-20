import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccountService } from '../accountService.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers:[MessageService]
})
export class UserProfileComponent {

  form!: FormGroup;
  loading = false;
  submitted = false;
  loggedInUser;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    public messageService : MessageService
  ) {     this.loggedInUser= JSON.parse(localStorage.getItem('user')!) || [];
}

  ngOnInit() {

    this.form = this.formBuilder.group({
      firstName: [this.loggedInUser.firstName ? this.loggedInUser.firstName :'' ],
      lastName: [this.loggedInUser.lastName ? this.loggedInUser.lastName : ''],
      companyName : [this.loggedInUser.companyName ? this.loggedInUser.companyName : ''],
      companyAddress:[this.loggedInUser.companyAddress ? this.loggedInUser.companyAddress : ''],	
      companyPhone:[this.loggedInUser.companyPhone ? this.loggedInUser.companyPhone : ''],
      username: [this.loggedInUser.username, [Validators.email,Validators.required]],
      password: [this.loggedInUser.password, [Validators.required]],
      userType:[this.loggedInUser.userType
        ,Validators.required]
    });
    if(this.loggedInUser.userType == 'student')
    {
      this.form.controls['fullName'].setValidators(Validators.required);
      this.form.controls['lastName'].setValidators(Validators.required);

    }
    else{
      this.form.controls['companyName'].setValidators(Validators.required);
      this.form.controls['companyAddress'].setValidators(Validators.required);	
      this.form.controls['companyPhone'].setValidators(Validators.required);
    }

  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.submitted = true;

    this.saveUser()
        .pipe(first())
        .subscribe({
            next: () => {

              this.messageService.add({  severity: 'success', summary: 'Profile updated successfuly' });

               // this.router.navigateByUrl('/users');
            },
            error: error => {
              this.messageService.add({  severity: 'warn', summary: 'Invalid username or password',});

                this.submitted = false;
            }
        })
}

private saveUser() {
    // create or update user based on id param
    return this.loggedInUser.id
        ? this.accountService.update(this.loggedInUser.id!, this.form.value)
        : this.accountService.register(this.form.value);
}
}


