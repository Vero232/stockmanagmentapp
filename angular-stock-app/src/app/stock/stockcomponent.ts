import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../account/login/login.component';
import { LoginServiceService } from '../login-service.service';
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.sass']
})
export class StockComponent implements OnInit {


  constructor(private loginService:LoginServiceService,private router: Router) { }
  ngOnInit(): void {
 
    if(!this.loginService.isLoggedIn){
          this.router.navigate(['/login'])
    }
  }

}
