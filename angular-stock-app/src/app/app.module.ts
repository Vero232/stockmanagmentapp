import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {StockApiService} from './stock-api.service.'
import { AppComponent } from './app.component';
import { StockComponent } from './stock/stockcomponent';
import { ShowStockCardComponent } from './stock/show-stock/show-stock-card.component';
import { AddEditstockComponent } from './stock/add-edit-stock/add-edit-stock.component';
import { LoginComponent } from './account/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { DisplayImageComponent } from './stock/display-image/display-image.component';
import { AllImagesComponent } from './stock/all-images/all-images.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { SortIconComponent } from './sort-icon/sort-icon.component';

const appRoute: Routes = [

  {path: '', component: StockComponent }, 
   {path: 'login', component: LoginComponent}

 
]

@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    ShowStockCardComponent,
    AddEditstockComponent,   
    LoginComponent, DisplayImageComponent, AllImagesComponent, SortIconComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [StockApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
