import { Component, OnInit } from '@angular/core';
import{FormControl,FormGroup, Validators}from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  repeatPass:string='none';
  displayMsg: string='';
  isAccountCreated: boolean=false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  registerForm=new FormGroup({
    firstname:new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("[a-zA-Z].*"),
    ]),
    lastname:new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("[a-zA-Z].*"),
    ]),
    email:new FormControl(''),
    mobile:new FormControl('',[
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern("[0-9]*"),
    ]),
    gender:new FormControl(''),
    pwd:new FormControl(''),
    rpwd:new FormControl(''),
  })

  registerSubmited(){
    if(this.PWD.value==this.RPWD.value){
      console.log(this.registerForm.valid);
      this.repeatPass='none'

      this.authService.registerUser([
        this.registerForm.value.firstname!,
        this.registerForm.value.lastname!,
        this.registerForm.value.email!,
        this.registerForm.value.mobile!,
        this.registerForm.value.gender!,
        this.registerForm.value.pwd!,

      ])
      .subscribe((res)=>{
         if(res=='Success'){
          this.displayMsg="Account Created Successfully";
          this.isAccountCreated=true;
         }
         else if(res=='Already Exists'){
          this.displayMsg="Account Already Exists";
          this.isAccountCreated=false;

         }
         else{
          this.displayMsg='Something Went Wrong';
          this.isAccountCreated=false;

         }
      });
    }
    else{
      this.repeatPass='inline'
    }
  }

  get FirstName(): FormControl{
    return this.registerForm.get("firstname")as FormControl;
  }
  get LastName(): FormControl{
    return this.registerForm.get("lastname")as FormControl;
  }
  get Email(): FormControl{
    return this.registerForm.get("email")as FormControl;
  }
  get Mobile(): FormControl{
    return this.registerForm.get("mobile")as FormControl;
  }
  get Gender(): FormControl{
    return this.registerForm.get("gender")as FormControl;
  }
  get PWD(): FormControl{
    return this.registerForm.get("pwd")as FormControl;
  }
  get RPWD(): FormControl{
    return this.registerForm.get("rpwd")as FormControl;
  }



}
