import { Component } from '@angular/core';
import Ithietke from '../../../interface/thietke';
import { ThietkeService } from '../../../service/thietke.service';

@Component({
  selector: 'app-thietke-list',
  imports: [],
  templateUrl: './thietke-list.component.html',
  styleUrl: './thietke-list.component.css',
})
export class ThietkeListComponent {
  // tạo mảng sp chứa ds sản phẩm
  thietke: Ithietke[] = [];

  // lấy dữ liệu tù service từ class ThietkeService
  constructor(private thietkemoi: ThietkeService) {}
  // gán ThietkeService cho thietkemoi

  ngOnInit() {
    // sd để lấy ds sản phẩm
    this.thietkemoi.getlist().subscribe({
      next: (data) => {
        this.thietke = data;
      },
    });
  }

}
