import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface UsernameAvaibleResponse {
  available: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient) { }

  checkUsernameAvailability(username: string) {
    return this.http.post<UsernameAvaibleResponse>('https://api.angular-email.com/auth/username', {
      username
    })
  }
}
