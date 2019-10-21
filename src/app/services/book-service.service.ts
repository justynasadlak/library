import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  constructor(private http: HttpClient) { }

  getAllBooks() {
    return this.http.get('/assets/books.txt', { responseType: 'text' as 'json'});
  }
}
