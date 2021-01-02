import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {User} from '../models/user.interface';

@Injectable()
export class RestService {
  private baseUrl = environment.apiUrl;
  private client = 'certifications-client';
  private secret = 'secret';

  public constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  private get basicAuth(): string {
    return 'Basic ' + btoa(this.client + ':' + this.secret);
  }

  private get authorizationHeader(): string {
    if (this.isAuthenticated()) {
      return 'Bearer ' + this.cookieService.get('accessToken');
    }
    return this.basicAuth;
  }

  private get loginHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: this.basicAuth
    });
  }
  private get registrationHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.basicAuth
    });
  }

  public get headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authorizationHeader
    });
  }

  public isAuthenticated(): boolean {
    return this.cookieService.check('accessToken');
  }

  public login(username: string, password: string): Observable<any> {
    console.log('LOGIN');
    return this.http.post(this.baseUrl + '/login', 'grant_type=password&username=' + username + '&password=' + password,
      {headers: this.loginHeaders}).pipe(
        tap(o => {
          this.cookieService.set('accessToken', o.access_token, o.expires_in);
        })
    );
  }
  public logout(): Observable<any> {
    return of(this.cookieService.delete('accessToken'));
  }


  public read<T>(url: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + url, {headers: this.headers});
  }

  public create<T>(url: string, object: T): Observable<T> {
    return this.http.post<T>(this.baseUrl + url, object, {headers: this.headers});
  }

  public update<T>(url: string, object: T): Observable<T> {
    return this.http.put<T>(this.baseUrl + url, object, {headers: this.headers});
  }

  public delete(url: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + url, {headers: this.headers});
  }

  public register(url: string, object: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + url, object, {headers: this.registrationHeaders});
  }
}
