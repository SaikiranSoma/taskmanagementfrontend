import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../Models/login';
import { LoginResponse } from '../../Models/loginresponse';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login:Login={
    UserName:" ",
    Password:" "
  }
  submitted:boolean=false;
  loginForm: FormGroup=null!;
  invalidLogin: boolean=true;
  constructor(private fb:FormBuilder,private loginservice:LoginService,private router:Router){}
  ngOnInit(): void{
    this.loginForm=this.fb.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    });
  }

  validateControl(input:string)
    {
      return this.loginForm.get(input)?.invalid &&
      (this.loginForm.get(input)?.touched||
      this.loginForm.get(input)?.dirty)
    }
    validateControlError(input:string,errorType:string)
    {
      return this.loginForm.get(input)?.hasError(errorType)&&
      (this.loginForm.get(input)?.touched||
      this.loginForm.get(input)?.dirty)
    }

    onLogin(){
      this.login={
        UserName:this.loginForm.value.username,
        Password:this.loginForm.value.password
      }
      this.loginservice.postData(this.login).subscribe({
        next: (response: LoginResponse) => {
          if (response.token) {
            this.invalidLogin = false;
            console.log('Login successful', response);
            
            localStorage.setItem('token', response.token);
            const roles = response.roles;
            if (roles.includes('Manager')) {
              this.router.navigate(['/dashboard/maindashboard']);
              console.log('User is an Admin');
            } else if (roles.includes('Employee')) {
              this.router.navigate(['/dashboard/maindashboard']);
              console.log('User is a Resident');
            }
          } else {
            this.invalidLogin = true;  
          }
        },
        error: (error) => {
          this.invalidLogin = true;
          console.error('Login failed', error);
        }
      });
    }
    }

