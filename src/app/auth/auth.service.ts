import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators';

interface UsernameAvaibleResponse {
  available: boolean;
}

interface SignUpCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface SignUpResponse {
  username: string;
}

interface SignedInResponse {
  authenticated: boolean;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signin$ = new BehaviorSubject(false);

  constructor( private http: HttpClient) { }

  checkUsernameAvailability(username: string) {
    return this.http.post<UsernameAvaibleResponse>(`${this.rootUrl}/auth/username`, {
      username
    })
  }

  signUp(credentials: SignUpCredentials) {
    return this.http.post<SignUpResponse>(`${this.rootUrl}/auth/signup`, credentials)
      .pipe(
        tap(() => this.signin$.next(true))
      )
  }

  checkAuthStatus() {
    return this.http.get<SignedInResponse>(`${this.rootUrl}/auth/signedin`)
      .pipe(
        tap(({authenticated}) => {
          this.signin$.next(authenticated);
        })
      )
  }

  signOut() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {})
      .pipe(
        tap(() => this.signin$.next(false))
      )
  }

  signIn(credentials: SignInCredentials) {
    return this.http.post(`${this.rootUrl}/auth/signin`, credentials)
      .pipe(
        tap(() => this.signin$.next(true))
      )
  }
}
