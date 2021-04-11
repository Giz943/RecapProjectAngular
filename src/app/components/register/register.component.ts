import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value);

      this.authService.register(registerModel).subscribe(
        (response) => {
          this.toastrService.info(response.message);
        },
        (responseError) => {
          console.log(responseError);
          this.toastrService.error(responseError.error.message);
        }
      );
    } else {
      console.log(this.registerForm);
      if (this.registerForm.controls.email.errors) {
        this.toastrService.error('Geçerli eposta giriniz');
      }
      else if(this.registerForm.controls.password.errors){
        this.toastrService.error('Şifre kriterlerine uymuyor');
      }
      else if(this.registerForm.controls.firstName.errors){
        this.toastrService.error('Adı  alanı boş olamaz');
      }
      else if(this.registerForm.controls.lastName.errors){
        this.toastrService.error('Soyadı  alanı boş olamaz');
      }
      else{
        this.toastrService.error('Form Eksik');
      }
    }
  }

}
