import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // chuyển hướng
import IProduct from '../../../interface/product'; //  đảm bảo đr dữ liệu sản phẩm
import { ProductService } from '../../../service/product.service'; // lấy ds API
import { CommonModule } from '@angular/common'; // Chứa các tính năng cơ bản của Angular như ngIf, ngFor.

@Component({
  selector: 'app-product-list', // Tên của component khi gọi trong HTML
  imports: [RouterLink, CommonModule], // Import các module cần thiết
  templateUrl: './product-list.component.html', // Đường dẫn đến file HTML của component
  styleUrl: './product-list.component.css' // Đường dẫn đến file CSS của component
})

export class ProductListComponent {
  products: IProduct[] = [] //Đây là mảng chứa danh sách sản phẩm.

  constructor(private productServer: ProductService){} // ProductService để có thể gọi API lấy danh sách sản phẩm

  ngOnInit(){  //ngOnInit Hàm này sẽ tự động chạy khi component được khởi tạo.
    //Sử dụng ngOnInit() để tải danh sách sản phẩm khi component khởi chạy.
    
    this.productServer.getList().subscribe({ //Gọi phương thức getList() từ ProductService để lấy danh sách sản phẩm từ API.
      next: (data) =>{
        this.products = data; //Khi API trả về dữ liệu, gán danh sách sản phẩm vào this.products.
      }
    })
  }

  handeDelete(id: string){
    if(window.confirm("Bạn có chắc chắn muốn xóa không?")){
      // xóa
      this.productServer.delete(id).subscribe({
        next:()=>{
          // console.log("Xóa thành công");
          this.products = this.products.filter((item)=>{
            return item.id != id
          })
        },
        error: () => {
          alert("xóa thất bại")
        }
      })
    }
  }
}