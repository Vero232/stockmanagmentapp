import { Component, OnInit,Input } from '@angular/core';
import { Observable } from 'rxjs';
import { StockApiService } from 'src/app/stock-api.service.';

import { HttpClient } from '@angular/common/http';
interface Wallpaper {
  id: number,
  wallpaperContent: Uint8Array[];
}
@Component({
  selector: 'app-add-edit-stock',
  templateUrl: './add-edit-stock.component.html',
  styleUrls: ['./add-edit-stock.component.sass']
})
export class AddEditstockComponent implements OnInit {

  stockList$!: Observable<any[]>
  statusList$!: Observable<any[]>
  stockTypesList$!: Observable<any[]>
  image = new Array<string>(4);
  selectedFile: File[] = <any>[];
  constructor(private service:StockApiService,private http:HttpClient) { }

  @Input() stock:any;
  id: number = 0;
  regNo: string = "";
  make: string = "";
  model: string = "";
  modelYear: number = 0;
  currentKMS: string = "";
  colour: string = "";
  vin: number = 0;
  retailPrice: string = "";
  costlPrice: string = "";
  dtCreated: Date =  new Date();
  dtUpdated: Date =  new Date();
  comments: string = "";



  ngOnInit(): void {

    this.id =  this.stock.id;
    this.regNo = this.stock.regNo;
    this.make = this.stock.make;
    this.model = this.stock.model;
    this.modelYear = this.stock.modelYear;
    this.currentKMS = this.stock.currentKMS;
    this.colour = this.stock.colour;
    this.vin = this.stock.vin;
    this.retailPrice = this.stock.costlPrice;
    this.costlPrice = this.stock.costlPrice;
    this.dtCreated = this.stock.dtCreated;
    this.dtUpdated = this.stock.dtUpdated;

    this.stockList$ =  this.service.getStockList();
  }



  


  addstock(){

    var stock = {
      id: this.id,
      regNo:this.regNo,
      make:this.make,
      model:this.model,
      modelYear:this.modelYear,
      currentKMS:this.currentKMS,
      colour:this.colour,
      vin:this.vin,
      retailPrice:this.costlPrice,
      costlPrice:this.costlPrice,
      dtCreated:this.dtCreated,
      dtUpdated:this.dtUpdated,

    }

    this.service.addStock(stock).subscribe(res =>{
      var closeModal = document.getElementById('add-edit-modal-close')

      if(closeModal){
        closeModal.click();
      }
      var showAddSueccess = document.getElementById('add-success-alert')
      if(showAddSueccess){
        showAddSueccess.style.display = "block"
      }
      setTimeout(function(){
        if(showAddSueccess){
          showAddSueccess.style.display = "none"
        }
      },4000)
      this.stockList$ =  this.service.getStockList();
    })

  }

  updatestock(){

    var stock = {
      id: this.id,
      regNo:this.regNo,
      make:this.make,
      model:this.model,
      modelYear:this.modelYear,
      currentKMS:this.currentKMS,
      colour:this.colour,
      vin:this.vin,
      retailPrice:this.costlPrice,
      costlPrice:this.costlPrice,
      dtUpdated:this.dtUpdated,
    }
    var id:number = this.id
    this.service.updateStock(id, stock).subscribe(res =>{
      var closeModal = document.getElementById('add-edit-modal-close')
      if(closeModal){
        closeModal.click();
      }
      var showUpdateSueccess = document.getElementById('update-success-alert')
      if(showUpdateSueccess){
        showUpdateSueccess.style.display = "block"
      }
      setTimeout(function(){
        if(showUpdateSueccess){
          showUpdateSueccess.style.display = "none"
        }
      },4000)
      this.stockList$ =  this.service.getStockList();
    })
  }
}
