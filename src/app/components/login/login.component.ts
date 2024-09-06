import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  submitted:boolean=false;
  loginForm: FormGroup=null!;
  constructor(private fb:FormBuilder,private loginservice:LoginService){}
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
}
