import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/product.service';
import IProduct from '../../interface/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true, // Cần thêm standalone nếu dùng Angular 15+
  imports: [CommonModule, RouterLink], // Import CommonModule để hỗ trợ currency pipe
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  products: IProduct[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getList().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log("Hoàn thành");
      }
    });
  }
}
