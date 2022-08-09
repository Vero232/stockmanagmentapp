import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StockApiService } from 'src/app/stock-api.service.';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-show-stock-card',
  templateUrl: './show-stock-card.component.html',
  styleUrls: ['./show-stock-card.component.sass']
})
export class ShowStockCardComponent implements OnInit {

  stockList$!:Observable<any[]>
  imageList$!:Observable<any[]>
  stockList:any[] = [];
  primaryImage:any;
  regNo:any;
  res:any;
  isLoggedIn:boolean = false;
  key:string = 'regNo';
  p:number = 1;
  reverse:boolean=false;
  constructor(private service:StockApiService) { }


  ngOnInit(): void {
//= this.service.getStockList();
  
    this.service.getStockList().subscribe((response) =>{

      this.stockList = response;
      //this.stockList$ =  this.stockList;
    })


  }

  onKeyUp(event:any){

    if(this.regNo == ""){
      this.ngOnInit()
    }else{
      this.stockList = this.stockList.filter(res =>{
        return res.regNo.toLocaleLowerCase().match(this.regNo.toLocaleLowerCase());
      })
    }
  }

  sort(key: string){
this.key = key;
this.reverse = !this.reverse
  }
  //VARIABLES(properties)
  modalTitle:string = '';
  activateAddEditCompoment:boolean = false;
  test:any;
  itemId:number = 0;
  


  modalAdd(){

    this.test ={
      id:0,
      regNo:0,
      make:null,
      model:null,
    }

    this.modalTitle = "Add Vehicle";
    this.activateAddEditCompoment = true;
  }




  
  modalEdit(item:any){
this.test = item;
this.modalTitle = "Edit Vehicle";
this.activateAddEditCompoment = true;
  }

  delete(item:any){
    if(confirm(`are you sure you want to delete this vehicle ${item.id}`)){
      this.service.deleteStock(item.id).subscribe(res =>{
        var closeModal = document.getElementById('add-edit-modal-close')
        if(closeModal){
          closeModal.click();
        }
        var showDeleteSueccess = document.getElementById('delete-success-alert')
        if(showDeleteSueccess){
          showDeleteSueccess.style.display = "block"
        }
        setTimeout(function(){
          if(showDeleteSueccess){
            showDeleteSueccess.style.display = "none"
          }
        },4000)
        this.stockList$ =  this.service.getStockList();
      })
    }
  }
  modalClose(){
    this.activateAddEditCompoment = false;
    this.ngOnInit()
  }


}
