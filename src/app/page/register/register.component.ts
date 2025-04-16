import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  authForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.authForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    })
  }

  handleSubmit(){
    // console.log(this.authForm.valid);
    if(this.authForm.invalid){
      this.authForm.markAllAsTouched();// đánh dấu các input được chạm
      return;
    }
    // console.log(this.authForm.value);
    
    //code
    this.authService.register(this.authForm.value).subscribe({
      next: () =>{
        alert("Đăng ký thành công");
        this.router.navigate(['/login'])
      },
      error: (err)=>{
        // console.log(err);
        alert(err.error)
      }
    })
  }
}