import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormControl, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  timeZone:string='';
  
  registerForm: FormGroup=null!;
  submitted = false;
  constructor(private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      empid: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      country: ['', [Validators.required]]
    });
  }
  
  validateControl(input:string)
    {
      return this.registerForm.get(input)?.invalid &&
      (this.registerForm.get(input)?.touched||
      this.registerForm.get(input)?.dirty)
    }
    validateControlError(input:string,errorType:string)
    {
      return this.registerForm.get(input)?.hasError(errorType)&&
      (this.registerForm.get(input)?.touched||
      this.registerForm.get(input)?.dirty)
    } 
    registerUser(): void {
    console.log("submitted");
    this.submitted = true;
    if(this.registerForm.valid){
     const formdata={...this.registerForm.value,timeZone:this.timeZone}
     console.log(formdata);
    }  
  }
  
}
