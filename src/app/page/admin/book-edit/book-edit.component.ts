import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../service/book.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.css'
})
export class BookEditComponent {
  id: string | null = null;
  bookForm!: FormGroup;

  constructor(
    private route: ActivatedRoute, // Lấy ID từ URL
    private bookService: BookService, // Dịch vụ xử lý API cho sách
    private formBuilder: FormBuilder, // Quản lý form nhập liệu
    private router: Router // Điều hướng trang
  ) {
    this.id = this.route.snapshot.params['id']; // Lấy ID từ URL
    this.bookForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, Validators.min(10000)]],
      imageURL: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      published: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    if (this.id) {
      this.bookService.getById(this.id).subscribe({
        next: (data) => {
          this.bookForm.patchValue(data);
        },
        error: (err) => {
          alert('Không tìm thấy sách: ' + err.message);
        }
      });
    }
  }

  handleSubmit() {
    if (this.bookForm.invalid) return; // Nếu form có lỗi, không gửi request

    this.bookService.update(this.id!, this.bookForm.value).subscribe({
      next: () => {
        alert('Cập nhật sách thành công');
        this.router.navigate(['/admin/book']);
      },
      error: (err) => {
        alert('Lỗi khi cập nhật: ' + err.message);
      }
    });
  }
}
