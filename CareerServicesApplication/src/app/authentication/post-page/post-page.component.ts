import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../accountService.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent {
  postData: any;

  usersData: any = [];

  constructor(private router: Router,private accountService : AccountService) {

    this.postData = JSON.parse(localStorage.getItem('currentPost')!);

    let users = JSON.parse(localStorage.getItem("Users")!);
    if (this.postData.userId.length > 0) {
      this.postData.userId.forEach((elem: any) => {

        this.usersData.push(users.find((x: any) => x.id == elem));

      })
    }
  }

  viewResume(data: any) {

    let users = JSON.parse(localStorage.getItem("Users")!);
    if (users.find((x: any) => x.id === data.id)) {

      let user = users.find((x: any) => x.id === data.id);


      if (localStorage.getItem("uploadedResumes")) {


        const downloadLink = document.createElement("a");
        let resumes: any;
        resumes = (localStorage.getItem('uploadedResumes'));
        resumes = JSON.parse(resumes);
        resumes.forEach((element: any) => {


          if (element.id == data.id) {

            downloadLink.href = element.resumeLink;
            downloadLink.download = element.name;
            downloadLink.click();
          }
        });
      }
      // if(user.default && user.default == "upload")
      // {

      //   if(localStorage.getItem("uploadedResumes"))
      //   {


      //     const downloadLink = document.createElement("a");
      //     let resumes: any;
      //     resumes = (localStorage.getItem('uploadedResumes'));
      //     resumes = JSON.parse(resumes);
      //     resumes.forEach((element: any) => {


      //       if (element.id == data.id) {

      //         downloadLink.href = element.resumeLink;
      //         downloadLink.download = element.name;
      //         downloadLink.click();
      //       }
      //     });






      //   }
      // }

      // if(user.default && user.default == "form")
      // {

      //   this.router.navigate(['/viewResume'],user.id);

      // }


    }


  }

  sendNotification(data: any, flag: boolean) {

    //this.sendSms();

    if (localStorage.getItem("notification")) {

      let previousData = [];
      let newData = JSON.parse(localStorage.getItem("notification")!);
      newData.forEach((elem:any)=>{
        previousData.push(elem);
      })

      let obj = {
        'companyName':this.postData.companyName,
        'id':data.id,
        'job_title':this.postData.job_title,
        'isAccepted': flag,

      }


      previousData.push(obj)

      localStorage.setItem("notification", JSON.stringify(previousData));




    }
    else {
      let previous = [];
      let obj = {
       'companyName':this.postData.companyName,
       'id':data.id,
       'job_title':this.postData.job_title,

        'isAccepted': flag
      }

      previous.push(obj);
      localStorage.setItem("notification", JSON.stringify(previous));


    }
    // const index = this.usersData.indexOf(data);
    //   if (index > -1) { // only splice array when item is found
    //     this.usersData.splice(index, 1); // 2nd parameter means remove one item only
    //   }


   // this.getStatus();
  }
  // getStatus()
  // {
  //   let notificationData = JSON.parse(localStorage.getItem("notification")!);

  //   notificationData.forEach((elem:any)=>{

  //     if(elem.isAccepted)
  //     {

  //       this.usersData.find((x:any)=>x.id == elem.id);

  //     }


  //   })

  // }


  sendSms()
  {


    this.accountService.sendMessage('15145719498','Application accepted');


  }
}
