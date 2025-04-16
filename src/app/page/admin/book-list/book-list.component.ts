import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../service/book.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IBook } from '../../../interface/book';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterLink, CommonModule , ReactiveFormsModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: IBook[] = [];
  filteredBooks: IBook[] = [];
  filterForm!: FormGroup;

  constructor(private bookService: BookService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeFilterForm();
    this.fetchBooks();
  }

  initializeFilterForm() {
    this.filterForm = this.formBuilder.group({
      title: ['']
    });

    // Lắng nghe thay đổi trong form để lọc dữ liệu ngay lập tức
    this.filterForm.valueChanges.subscribe(() => this.applyFilter());
  }

  fetchBooks() {
    this.bookService.getList().subscribe({
      next: (data) => {
        this.books = data;
        this.filteredBooks = data;
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách sách:', err);
      }
    });
  }

  applyFilter() {
    const titleFilter = this.filterForm.get('title')?.value.toLowerCase() || '';
    this.filteredBooks = this.books.filter(book => book.title.toLowerCase().includes(titleFilter));
  }

  handleDelete(id: string) {
    if (window.confirm('Bạn có chắc chắn muốn xóa sách này không?')) {
      this.bookService.delete(id).subscribe({
        next: () => {
          this.books = this.books.filter((item) => item.id !== id);
          this.applyFilter();
        },
        error: (err) => {
          console.error('Lỗi khi xóa sách:', err);
          alert('Xóa thất bại');
        }
      });
    }
  }
}
