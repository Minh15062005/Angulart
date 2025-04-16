import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { bookAdd, IBook } from '../interface/book';

@Injectable({
  providedIn: 'root' 
})
export class BookService {
  url = 'http://localhost:3000/books'; // URL của API sách

  constructor(private http: HttpClient) { } // Inject HttpClient để sử dụng HTTP methods.

  // Lấy danh sách sách
  getList(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.url);
  }

  // Lấy thông tin sách theo ID
  getById(id: string): Observable<IBook> {
    return this.http.get<IBook>(`${this.url}/${id}`);
  }

  // Thêm sách mới
  add(data: bookAdd): Observable<IBook> {
    return this.http.post<IBook>(this.url, data);
  }

  // Xóa sách theo ID
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  // Cập nhật thông tin sách
  update(id: string, data: any): Observable<IBook> {
    return this.http.put<IBook>(`${this.url}/${id}`, data);
  }
  
  
}
