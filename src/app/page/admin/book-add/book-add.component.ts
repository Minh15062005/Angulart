import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../../service/book.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IBook } from '../../../interface/book';

@Component({
  selector: 'app-book-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book-add.component.html',
  styleUrl: './book-add.component.css'
})
export class BookAddComponent {
  bookForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private bookService: BookService, private router: Router) {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      imageURL: ['', Validators.required],
      published: [false],
      genre: ['', Validators.required]
    });
  }

  handleSubmit() {
    if (this.bookForm.valid) {
      this.bookService.add(this.bookForm.value).subscribe({
        next: () => {
          alert('Thêm sách thành công');
          this.router.navigate(['admin/book']);
        },
        error: (err) => {
          alert(err.message);
        }
      });
    } else {
      alert('Vui lòng nhập đầy đủ thông tin sách');
    }
  }
}
