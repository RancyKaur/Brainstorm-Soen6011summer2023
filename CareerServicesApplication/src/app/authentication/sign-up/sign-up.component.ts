import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccountService } from '../accountService.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [MessageService]
})
export class SignUpComponent {
 form!: FormGroup;
  loading = false;
  submitted = false;
  userId: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private messageService : MessageService
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    this.userId = this.route.snapshot.params['id'];
    this.form = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      companyName:[''],
      companyAddress:[''],
      companyPhone:[''],
      username: ['', [Validators.email,Validators.required]],
      password: ['', [Validators.required]],
      userType:[this.route.snapshot.params['id']
        ,Validators.required]
    });
    if(this.route.snapshot.params['id'] == 'student')
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

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.register(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.messageService.clear();
          this.messageService.add({ severity: 'success', summary: 'Success' });
          this.router.navigate(['/'], { relativeTo: this.route });
        },
        error: error => {
          this.messageService.add({  severity: 'warn', summary: 'This email is already registered, Please Login',});
          this.loading = false;
        }
      });
  }
}
