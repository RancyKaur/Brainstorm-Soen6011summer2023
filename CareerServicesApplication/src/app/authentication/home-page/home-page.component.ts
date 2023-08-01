import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccountService } from '../accountService.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers:[MessageService]
})
export class HomePageComponent implements OnInit {

  loggedInUser: any;
  posts: [];
  students: [];
  allposts:any;
  allStudents:any;
  selectedposts:any;
  allUsers: any;
  constructor(private messageService : MessageService,private router : Router,
    private accountService : AccountService)
  {

  }
  ngOnInit() {
    this.loggedInUser = JSON.parse(localStorage.getItem('user')!) || [];
    this.allposts = JSON.parse(localStorage.getItem('Posts')!) || [];
    this.allUsers = JSON.parse(localStorage.getItem('Users')!) || [];

    this.selectedposts=[];
    if(this.loggedInUser.userType == 'employer' ||  this.loggedInUser.userType == 'admin')
    {
    this.allposts.forEach((elem:any)=>{

      if(elem.id == this.loggedInUser.id)
      {
        this.selectedposts.push(elem);
      }

    })

    this.allStudents = [];

    this.allUsers.forEach((elem:any)=>{


      if(elem.userType == "student")
      {
        this.allStudents.push(elem);
      }
    })
  }

  else{

    let index =0;
    this.allposts.forEach((elem:any)=>{



      if(elem.userId.length>0)
      {
        if(elem.userId.find((x:any) => x === this.loggedInUser.id))
        {

          let obj ={
            'isApplied' :true,
            ...elem
          }
          this.allposts[index] = obj;

        }

      }
      index++;
    })
  }








  }

  deletePost(id:any)
  {
    this.allposts.forEach((elem:any)=>{

      if(elem.postId == id)
      {
        let posts = this.allposts.filter((x:any) => x.postId !== id);
        localStorage.removeItem('Posts');
            localStorage.setItem('Posts', JSON.stringify(posts));
            this.messageService.add({ severity: 'success', summary: 'Post deleted successfully' });

            this.ngOnInit();
      }

    })
  }


  deleteStudent(id:any)
  {
    this.allUsers.forEach((elem:any)=>{

      if(elem.id == id)
      {
        let students = this.allUsers.filter((x:any) => x.id !== id);
        localStorage.removeItem('Users');
            localStorage.setItem('Users', JSON.stringify(students));
            this.messageService.add({ severity: 'success', summary: 'Student deleted successfully' });

            this.ngOnInit();
      }

    })
  }


  editJob(id:any)
  {
    this.router.navigate(['/editPost',id]);
  }

  applyJob(data:any)
  {

    if(!data.isApplied)
    {
    data.userId.push(this.loggedInUser.id)
    this.accountService.updatePost(data.postId,data);

    this.messageService.add({ severity: 'success', summary: 'Your application has been sent to the employer' });
  }
  else{

    this.messageService.add({ severity: 'success', summary: 'Your application has already been sent to the employer' });

  }
  this.ngOnInit();
  }

  redirectToPost(data:any)
  {

    localStorage.setItem('currentPost',JSON.stringify(data));

    this.router.navigate(['/postpage'])
  }
}
