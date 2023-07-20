import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../accountService.service';
import { first, map } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
export interface SelectedFiles {
  name: string;
  file: any;
  base64?: string;
}
@Component({
  selector: 'app-add-apost',
  templateUrl: './add-apost.component.html',
  styleUrls: ['./add-apost.component.scss'],
  providers: [MessageService]
})
export class AddAPostComponent {
  loggedInUser: any;
  loggedInUserResume: any;
  selected: boolean;
  resumeTypeBuild: boolean;
  base64Response: any;
  public selectedFiles: SelectedFiles[] = [];
  pdfSrc: any;
  elementRef: ElementRef;
  submitted: boolean;
  addPostForm: any;
  constructor(private formBuilder: FormBuilder, private accountService: AccountService,
    private messageService: MessageService,
    private router: Router, private route: ActivatedRoute,
    private httpClient: HttpClient,
    private renderer: Renderer2) {
    this.loggedInUser = JSON.parse(localStorage.getItem('user')!) || [];

    let resume = JSON.parse(localStorage.getItem('Resumes')!) || [];
    this.loggedInUserResume = resume.find((x: any) => x.id === this.loggedInUser.id);

  }

  ngOnInit(): void {
    this.addPostForm = this.formBuilder.group({
      companyName: [ '', Validators.required],
      job_title: [ '', Validators.required],
      job_desc: ['', [Validators.required]],
      loc: ['', [Validators.required]],
      phone:['', [Validators.required]],

      id: this.loggedInUser.id

    });
  }


toggle()
{
  this.router.navigate(['/homepage']);
}

save() {
  this.submitted = true;
  console.log(this.addPostForm);


  if (this.addPostForm.invalid) {
    return;
  }

  this.accountService.addPost(this.addPostForm.value)
    .pipe(first())
    .subscribe({
      next: () => {
        this.messageService.clear();

        this.messageService.add({ severity: 'success', summary: 'Success' });
        setTimeout (() => {
          this.router.navigate(['/homepage'], { relativeTo: this.route });
        }, 2000);
      },
      error: error => {
        this.messageService.add({ severity: 'warn', summary: 'Please try again.', });
      }
    });
}
}
