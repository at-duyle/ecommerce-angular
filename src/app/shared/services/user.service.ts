import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models/user';

@Injectable()
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private http: Http,
    private jwtService: JwtService
    ) { }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/users')
      .subscribe(
        data => this.setAuth(data.user),
        err => this.purgeToken()
      );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeToken();
    }
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.auth_token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeToken() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next(new User());
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }


  attemptAuth(credentials): Observable<User> {
    return this.apiService.post('/sessions', {user: credentials})
    .map(
      data => {
        this.setAuth(data.user);
        return data;
      }
    );
  }

  purgeAuth(): Observable<User> {
    return this.apiService.delete('/sessions/1')
    .map(
      data => {
        this.purgeToken();
        return data;
      }
    );
  }

  register(credentials): Observable<User> {
    return this.apiService.post('/users', {user: credentials})
    .map(
      data => {
        return data;
      }
    );
  }

  getCurrentUser(){
    return this.currentUserSubject.getValue();
  }

  update(userProfile): Observable<User>{
    return this.apiService.put('/users/1', {user: userProfile})
    .map(
      data => {
        this.currentUserSubject.next(data.user);
        return data;
      }
    );
  }

  updatePassword(passwords): Observable<User> {
    return this.apiService.put('/users/1/password', {user: passwords})
    .map(
      data => {
        return data;
      }
    );
  }

  registerConfirm(userId, confirmToken): any{
    return this.apiService.put('/register_confirm/1', {user: {id: userId, confirm_token: confirmToken}})
    .map(
      data => {
        return data;
      }
    );
  }

  updateNewConfirmToken(userId): any{
    return this.apiService.put('/users/'+ userId +'/confirm_token')
    .map(data => {
      return data;
    });
  }
}
