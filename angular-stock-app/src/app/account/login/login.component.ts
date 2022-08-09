import { Component, Input, OnInit } from '@angular/core';
import { StockApiService } from 'src/app/stock-api.service.';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/login-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:StockApiService, private loginService:LoginServiceService, private router: Router) { }


  @Input() loginDetails:any;
  EmailAddress: string = "";
  Password: string = "";

  login(){
    var loginDetails = {
      EmailAddress:this.EmailAddress,
      Password:this.Password,
    }
    this.service.userLogin(loginDetails).subscribe(response  =>{
      console.log(response)
      
      if(response.status == 200){
        this.loginService.isLoggedIn = true;
        this.router.navigate(['/'])
      }
      
    })
  }
  ngOnInit(): void {
  }

}
