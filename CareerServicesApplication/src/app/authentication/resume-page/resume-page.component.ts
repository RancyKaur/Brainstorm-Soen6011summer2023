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
  selector: 'app-resume-page',
  templateUrl: './resume-page.component.html',
  styleUrls: ['./resume-page.component.scss'],
  providers: [MessageService]
})
export class ResumePageComponent implements OnInit {
  expArrForm:FormGroup[]=[];
  eduArrForm:FormGroup[]=[];
  resumeBuilderForm: FormGroup;
  loggedInUser: any;
  loggedInUserResume: any;
  selected: boolean;
  resumeTypeBuild: boolean;
  base64Response: any;
  public selectedFiles: SelectedFiles[] = [];
  pdfSrc: any;
  elementRef: ElementRef;
  submitted: boolean;
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
    this.resumeBuilderForm = this.formBuilder.group({
      firstName: [this.loggedInUserResume?.firstName || '', Validators.required],
      lastName: [this.loggedInUserResume?.lastName || '', Validators.required],
      email: [this.loggedInUserResume?.email || '', [Validators.email, Validators.required]],
      phone: [this.loggedInUserResume?.phone || '' ? this.loggedInUserResume.phone : ''],
      experienceBlocks: this.formBuilder.array(this.buildExperienceBlock()),
      education: this.formBuilder.array(this.buildEducationForm()),
      id: this.loggedInUser.id

    });
  }

  buildExperienceBlock(): FormGroup[] {
    let expArr =this.loggedInUserResume?.experienceBlocks;
    if(this.loggedInUserResume)
    {
    expArr.forEach((exp: { title: any; company: any; location: any; startDate: any; endDate: any; description: any; }) => {
      this.expArrForm.push(this.formBuilder.group({
        title: [exp?.title, [Validators.required]],
        company: [exp?.company, [Validators.required]],
        location: [exp?.location, [Validators.required]],
        startDate: [exp?.startDate, [Validators.required]],
        endDate: [exp?.endDate, [Validators.required]],
        description: [exp?.description, [Validators.required]]
      }))
    });
    return this.expArrForm;}
    else
    {
      return [this.addExperienceBlock()];
    }
    
  }
  addExperienceBlock(): FormGroup {
    return this.formBuilder.group({
      title: ['', [Validators.required]],
      company: ['', [Validators.required]],
      location: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }
  buildEducationForm():FormGroup[]{
    
    let eduArr =this.loggedInUserResume?.education;
    if(this.loggedInUserResume)
    {
    eduArr.forEach((edu: { level_of_education: any; school_name: any; field: any; startDate: any; endDate: any; }) => {
      this.eduArrForm.push(this.formBuilder.group({
        level_of_education: [edu.level_of_education, [Validators.required]],
        school_name: [edu.school_name, [Validators.required]],
        field: [edu.field, [Validators.required]],
        startDate: [edu.startDate, [Validators.required]],
        endDate: [edu.endDate, [Validators.required]],
      }))
    });
    return this.eduArrForm;}
    else
    {
      return [this.educations()];
    }
  }

  educations(): FormGroup {
    return this.formBuilder.group({
      level_of_education: ['', [Validators.required]],
      school_name: ['', [Validators.required]],
      field: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],

    });
  }
  save() {
    this.submitted = true;
    console.log(this.resumeBuilderForm);


    if (this.resumeBuilderForm.invalid) {
      return;
    }

    this.accountService.addResume(this.resumeBuilderForm.value)
      .pipe(first())
      .subscribe({
        next: () => {

         // this.messageService.clear();

          this.messageService.add({ severity: 'success', summary: 'Success' });
         // this.setResumeType(false);
          //this.router.navigate(['/'], { relativeTo: this.route });
        },
        error: error => {
          this.messageService.add({ severity: 'warn', summary: 'This email is already registered, Please Login', });
        }
      });
  }

  get experienceBlocks(): FormArray {
    return this.resumeBuilderForm.get('experienceBlocks') as FormArray;
  }

  get education(): FormArray {
    return this.resumeBuilderForm.get('education') as FormArray;
  }


  addExperience() {
    this.experienceBlocks.insert(0, this.addExperienceBlock());
  }

  removeExperience(index: any) {
    let formArray = this.resumeBuilderForm.get('experienceBlocks') as FormArray;
    formArray.removeAt(index);

  }
  addEducation() {
    this.education.insert(0, this.educations());
  }
  removeEducation(index: any) {
    let formArray = this.resumeBuilderForm.get('education') as FormArray;
    formArray.removeAt(index);

  }
  setResumeType(flag: Boolean) {

    this.selected = true;
    if (flag) {
      this.resumeTypeBuild = true;
    }
    else {
      this.resumeTypeBuild = false;

    }
  }
  toggle() {
    this.selected = false;
  }


  onFileSelected(event: any) {


    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      let linkSource = reader.result as string;
      let resumes: any = [];
      let params = {
        id: this.loggedInUser.id,
        resumeLink: linkSource,
        name: file.name
      }
      if (localStorage.getItem('uplodedResumes')) {
        resumes = localStorage.getItem('uploadedResumes');
        if (resumes.find((x: any) => x.id === this.loggedInUser.id)) {
          let resume = resumes.find((x: any) => x.id === this.loggedInUser.id);
          Object.assign(resume, params);
          localStorage.setItem('uploadedResumes', JSON.stringify(resumes));
        }
        else {
          resumes.push(params);
          localStorage.setItem('uploadedResumes', JSON.stringify(resumes));
        }

      }
      else {
        resumes.push(params);
        localStorage.setItem('uploadedResumes', JSON.stringify(resumes));
      }
    }

  }




  displayPdf() {
    if (localStorage.getItem('uploadedResumes')) {
      const downloadLink = document.createElement("a");
      let data: any;
      data = (localStorage.getItem('uploadedResumes'));
      data = JSON.parse(data);
      data.forEach((element: any) => {

        if (element.id == this.loggedInUser.id) {
          downloadLink.href = element.resumeLink;
          downloadLink.download = element.name;
          downloadLink.click();
        }
      });

    }
    else{
      this.messageService.add({ severity: 'warn', summary: 'Kindly upload the resume first' });

    }

  }
}
