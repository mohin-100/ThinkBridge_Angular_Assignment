import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInSubject: BehaviorSubject<boolean>;
  public loggedIn$: Observable<boolean>;

  constructor(private router: Router) {
    this.loggedInSubject = new BehaviorSubject<boolean>(false);
    this.loggedIn$ = this.loggedInSubject.asObservable();
  }

  //used hard coded username and password to check authentication
  login(username: string, password: string): Observable<boolean> {
    const isLoggedIn = username === 'admin' && password === 'admin123';

    if (isLoggedIn) {
      this.loggedInSubject.next(true);
      localStorage.setItem('loggedIn', 'true');
    } else {
      this.loggedInSubject.next(false);
      localStorage.removeItem('loggedIn');
    }

    return this.loggedIn$;
  }

  logout(): void {
    localStorage.removeItem('loggedIn');
    this.loggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }
}
