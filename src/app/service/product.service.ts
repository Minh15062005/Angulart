import { HttpClient } from '@angular/common/http';
//HttpClient: Dùng để gửi HTTP requests.
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import IProduct, { ProductAdd } from '../interface/product';

@Injectable({
  providedIn: 'root' 
})
// Service : dịch vụ 
export class ProductService {
  url = 'http://localhost:3000/products'; // URL của API sản phẩm

  constructor(private http: HttpClient) { } // Inject HttpClient để sử dụng HTTP methods.
// inject  là một kỹ thuật giúp quản lý và cung cấp các đối tượng (service, dữ liệu,...) 

  getList(): Observable<IProduct[]>{

//Phương thức này trả về một Observable chứa dữ liệu có kiểu IProduct[] (mảng các sản phẩm).
// Observable là một kiểu dữ liệu trong RxJS giúp lắng nghe dữ liệu bất đồng bộ.

    return this.http.get<IProduct[]>(this.url)
    // this.http.get<...>() là phương thức của HttpClient dùng để gửi request GET đến API.
    // <IProduct[]>: Kiểu dữ liệu mong đợi từ API là một mảng sản phẩm (IProduct[]).
    // this.url: URL của API mà request sẽ gửi đến (http://localhost:3000/products).
  }

  getById(id: string){
    return this.http.get<IProduct>(`${this.url}/${id}`)
  }

  add(data: ProductAdd){
    return this.http.post(this.url,data)
  }

  delete(id: string){
    return this.http.delete(`${this.url}/${id}`)
  }

  update(id: string,data: any){
    return this.http.put(`${this.url}/${id}`,data)
  }
  
}