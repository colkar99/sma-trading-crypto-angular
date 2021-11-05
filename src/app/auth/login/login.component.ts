import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private service: CommonService

  ) { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]]
    });
  }
  submitMethod(): void{

    console.log(this.loginForm.value)
    this.service.postWithoutToken('v1/user/signin',this.loginForm.value).subscribe(((data: any) =>{
        debugger

        localStorage.setItem('authorization',data.token)
        this.route.navigateByUrl('home/list');
    }))


  }

}
