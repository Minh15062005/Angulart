import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product.service';
import IProduct from '../../interface/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true, // Nếu dùng Angular 15+
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'] // Sửa "styleUrl" thành "styleUrls"
})
export class ProductDetailComponent implements OnInit {
  product: IProduct | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getById(id).subscribe((data) => { // Sửa lỗi thiếu phương thức
        this.product = data;
      }, (error) => {
        console.error('Lỗi khi tải sản phẩm:', error);
      });
    }
  }
}
