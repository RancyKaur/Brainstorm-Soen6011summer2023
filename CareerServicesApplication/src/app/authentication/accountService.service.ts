import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from '../../models/user';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  environment = {

    apiUrl: "http://localhost:4200"
  }


  constructor(
    private router: Router,
    private http: HttpClient,
    private messageService : MessageService
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<User>(`${this.environment.apiUrl}/users/authenticate`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }


  sendMessage(phoneNumber: string, body1: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',


    });

    const body = new URLSearchParams();
    body.set('recipientNumber', phoneNumber);
    body.set('messageBody',body1);
    // Set the recipient phone number in the request payload
    this.http.post<any>('https://bazaar-frenchfry-6660.twil.io/testfunc', body, { headers }).subscribe(
      (response) => {
        console.log('SMS sent successfully!');
      },
      (error) => {
        console.error('Failed to send SMS:', error);
      }
    );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  register(user: User) {
    return this.http.post(`${this.environment.apiUrl}/users/register`, user);
  }

  addResume(user: User) {
    return this.http.post(`${this.environment.apiUrl}/users/addResume`, user);
  }
  addPost(user: User) {
    return this.http.post(`${this.environment.apiUrl}/users/addPost`, user);
  }
  getAll() {
    return this.http.get<User[]>(`${this.environment.apiUrl}/users`);
  }

  getById(id: string) {
    return this.http.get(`${this.environment.apiUrl}/getPost/${id}`);
  }

  update(id: string, params: any) {
    return this.http.put(`${this.environment.apiUrl}/users/${id}`, params)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        if (id == this.userValue?.id) {
          // update local storage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          // publish updated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      }));
  }

  updatePost(id: string, params: any) {

        let allposts:any;
        let flag;
       allposts = JSON.parse(localStorage.getItem('Posts')!);
        allposts.forEach((elem:any)=>{
          if(elem.postId == id)
        {
          let posts = allposts.filter((x:any) => x.postId != id);
          localStorage.removeItem('Posts');

              posts.push(params);
              localStorage.setItem('Posts', JSON.stringify(posts));


          flag = true;
        }
        else{
          flag = false;
        }
      });

return flag;

  }

  delete(id: string) {
    return this.http.delete(`${this.environment.apiUrl}/users/${id}`)
      .pipe(map(x => {
        // auto logout if the logged in user deleted their own record
        if (id == this.userValue?.id) {
          this.logout();
        }
        return x;
      }));
  }
}
