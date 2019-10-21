import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookServiceService } from 'src/app/services/book-service.service';
import { Angular2Txt } from 'angular2-txt/Angular2-txt';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  booksData;
  books = [];
  usersData;
  users = [];

  constructor(private http: HttpClient, private bookService: BookServiceService) {}
  
  ngOnInit() {
    this.getAllBooks();
    this.getAllUsers();
  }

  private getAllBooks() {
    this.bookService.getAllBooks().subscribe(data => {
      this.booksData = data;
      for (const line of this.booksData.split(/[\r\n]+/)){
        let book = Object.assign({}, line.split(";"));
        this.books.push(book);
      }
      console.log(this.books);
    });
  }

  private getAllUsers() {
    this.http.get('/assets/users.txt', { responseType: 'text' as 'json'}).subscribe(data => {
      this.usersData = data;
      for (const line of this.usersData.split(/[\r\n]+/)){
        let user = Object.assign({}, line.split(";"));
        this.users.push(user);
      }
      console.log(this.users);
    });
  }

  onBook(bookToBorrow) {
    console.log(bookToBorrow[0]);
    this.books.map(book => book[0] === bookToBorrow[0] ? book[4] = true : book);
    console.log(this.books);
    // new Angular2Txt(this.books, 'books', { fieldSeparator: ';' });
   
  }

  onGiveBookBack(bookId) {
    this.books.map(book => book[0] === bookId[0] ? book[4] = false : book);
    console.log(this.books);
  }

  isBookAvailable(book) {
   return book[4];
  }
}
