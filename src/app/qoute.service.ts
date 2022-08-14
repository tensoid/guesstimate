import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Qoute } from './guesstimate/guesstimate.component';



@Injectable({
  providedIn: 'root'
})
export class QouteService {

  constructor(private http: HttpClient) { }
  getQoute(): Observable<Qoute> {
    return this.http.get<Qoute>('http://localhost:3000/qoute');
  }
}
