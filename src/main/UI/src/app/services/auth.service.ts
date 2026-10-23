import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL: string = '/auth';
  private loggedInSubject = new BehaviorSubject<boolean>(this.checkLocalSession());
  public isLoggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  private checkLocalSession(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  public isLoggedIn(): boolean {
    return this.loggedInSubject.getValue();
  }

  public get currentUser(): any {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  checkAdminExists(): Observable<boolean> {
    return this.http.get<{ hasAdmin: boolean }>(`${this.baseURL}/check-admin`).pipe(
      map(res => res.hasAdmin),
      catchError(() => of(false))
    );
  }

  registerAdmin(password: string): Observable<any> {
    return this.http.post(`${this.baseURL}/register-admin`, {
      username: 'administrator',
      password: password
    });
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.baseURL}/login`, { username, password }).pipe(
      map(res => {
        if (res && res.authenticated) {
          localStorage.setItem('currentUser', JSON.stringify({ username: res.username, role: res.role }));
          this.loggedInSubject.next(true);
          return true;
        }
        return false;
      }),
      catchError(err => {
        console.error('Login error', err);
        return of(false);
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.loggedInSubject.next(false);
    this.router.navigate(['/login']);
  }
}
