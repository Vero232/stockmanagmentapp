import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockApiService {

  readonly azureBaseAPIUrl = "https://stockmanagmentapi.azurewebsites.net/api"
  readonly baseAPIUrl = "https://localhost:7055/api";

  constructor(private http:HttpClient) { }

  getStockList():Observable<any[]>{
    return this.http.get<any>(this.baseAPIUrl + '/stockitems')
  }

  addStock(data:any){
    return this.http.post(this.baseAPIUrl + '/stockitems', data);
  }

  updateStock(id:number|string, data:any){
    return this.http.put(this.baseAPIUrl + `/stockitems/${id}`, data);
  }

  deleteStock(id:number|string){
    return this.http.delete(this.baseAPIUrl + `/stockitems/${id}`)
  }


  //Login
  userLogin(data:any){
    return this.http.post(this.baseAPIUrl + `/login`, data, {observe: 'response'})
  }

  //Images
  postImages(data:any){
    return this.http.post(this.baseAPIUrl + `/images`, data, {observe: 'response'})
  }

  getImages(id:number){
    return this.http.get(this.baseAPIUrl + `/images/${id}`,{observe: 'response'})
  }

  deleteImages(id:number){
    return this.http.delete(this.baseAPIUrl + `/images/${id}`)
  }
}
