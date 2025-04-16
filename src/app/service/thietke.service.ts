import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Ithietke from '../interface/thietke';

@Injectable({
  providedIn: 'root',
})
export class ThietkeService {
    // tạo url để kết nối với db
    url='http://localhost:3000/products';
  // dùng constructor để kết nối với api lấy các dữ liệu get , pot , put..
  constructor(private http:HttpClient){}

  // tạo hàm lấy ds
  getlist():Observable<Ithietke[]>{// observable chứa dữ liệu mảng sản phẩm
    // this url gửi yêu cầu đến dg dânx
    return this.http.get<Ithietke[]>(this.url)
  }
//  url='http://localhost:3000/products';

//  constructor(private http:HttpClient){}

//  getList():Observable<Ithietke[]>{
//   return this.http.get<Ithietke[]>(this.url)
//  }
}
