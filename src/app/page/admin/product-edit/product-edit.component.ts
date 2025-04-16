import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-edit',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent {
  id: string|null = null
  productForm!: FormGroup

  constructor(
    private route: ActivatedRoute, // lấy id trên URL
    private productService: ProductService, // làm việc với các chức năng thêm sửa xóa,... trong product service
    private formBuilder: FormBuilder, // quản lý các trường thông tin trong productForm
    private router: Router // chuyển trang
  ){
    this.id = this.route.snapshot.params["id"];
    this.productForm = this.formBuilder.group({
      name: ['',[Validators.required,Validators.minLength(6)]],
      price: [null,[Validators.required,Validators.min(100)]],
      image: ['',[Validators.required]],
      status: [null,[Validators.required]],
      category: ['',[Validators.required]]
    })
  }

  ngOnInit(){
    if(this.id)
      this.productService.getById(this.id).subscribe({
        next: (data) =>{
          // console.log(data);
          this.productForm.patchValue(data)
        }
      })
  }

  handleSubmit(){
    if(this.productForm.invalid)
      return // nếu form đang có lỗi thì return

    this.productService.update(this.id!,this.productForm.value).subscribe({
      next: () =>{
        alert("Cập nhật thành công");
        this.router.navigate(['/admin/product'])
      },
      error: (err) =>{
        alert("Lỗi: "+ err.message)
      }
    })
  }

}