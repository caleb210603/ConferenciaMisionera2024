import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { catchError, Observable, retry, throwError } from 'rxjs';
import { User } from './../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  basePath = 'http://127.0.0.1:8000/conferencia/user';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // API Error Handling
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred: ${error.error.message} `);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    // Return Observable with Error Message to Client
    return throwError(
      () => new Error('Something happened with request, please try again later')
    );
  }

  getUserList(): Observable<User[]> {
    const url = `${this.basePath}/list`;
    return this.http
      .get<User[]>(url)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.basePath}/update/${user.person_id}`;
    return this.http
      .put<User>(url, user)
      .pipe(retry(2), catchError(this.handleError));
  }
}
