import { HttpClient } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs';
import { AccountService } from '../accountService.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
  providers: [MessageService]
})
export class EditPostComponent {
  loggedInUser: any;
  loggedInUserResume: any;
  selected: boolean;
  resumeTypeBuild: boolean;
  base64Response: any;
  pdfSrc: any;
  submitted: boolean;
  editPostForm: any;
  postData: any;
  postId: any;
  constructor(private formBuilder: FormBuilder, private accountService: AccountService,
    private messageService: MessageService,
    private router: Router, private route: ActivatedRoute,
    private httpClient: HttpClient,
    private renderer: Renderer2) {

    this.loggedInUser = JSON.parse(localStorage.getItem('user')!) || [];

    let resume = JSON.parse(localStorage.getItem('Resumes')!) || [];
    this.loggedInUserResume = resume.find((x: any) => x.id === this.loggedInUser.id);
    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      this.postId = params['id'] //log the value of id
    });


  }

  ngOnInit(): void {
    this.accountService.getById(this.postId)
      .pipe(first())
      .subscribe(x => {
        this.postData = x;
        this.editPostForm = this.formBuilder.group({
          companyName: [this.postData.companyName ? this.postData.companyName : '', Validators.required],
          job_title: [this.postData.job_title ? this.postData.job_title : '', Validators.required],
          job_desc: [this.postData.job_desc ? this.postData.job_desc : '', [Validators.required]],
          loc: [this.postData.loc ? this.postData.loc : '', [Validators.required]],
          phone: [this.postData.phone ? this.postData.phone : '', [Validators.required]],

          id: this.loggedInUser.id,
          postId: [this.postData.postId ? this.postData.postId : '']

        });
      });


  }


  toggle() {
    this.router.navigate(['/homepage']);
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit

    // stop here if form is invalid
    if (this.editPostForm.invalid) {
      return;
    }

    this.submitted = true;

    let flag = this.accountService.updatePost(this.postId, this.editPostForm.value);

    if (flag) {
      this.messageService.add({ severity: 'success', summary: 'Post updated successfuly' });

    }
    else {
      this.messageService.add({ severity: 'warn', summary: 'Please try again.', });

    }
  }
}

