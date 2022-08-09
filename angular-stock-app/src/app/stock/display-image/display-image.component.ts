import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StockApiService } from 'src/app/stock-api.service.';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-display-image',
  templateUrl: './display-image.component.html',
  styleUrls: ['./display-image.component.css']
})
export class DisplayImageComponent implements OnInit {

  constructor(private service:StockApiService) { }
  @Input() item:any;

//properties
  imageList: any[] = [];
  myEvents:any;

  ngOnInit(): void {
    this.getStockItemPrimary()
  }

  getStockItemPrimary(){

  this.service.getImages(this.item).subscribe(response =>{
    this.myEvents = response;
   // console.log(this.myEvents);


      this.myEvents.body.forEach( (element: any) => {
          if(element.imageType == 'Primary'){
            this.imageList.push({
                imageUrl: 'data:image/jpg;base64,' + element.imageBytes,
                imageType: element.imageType
             })
            }
        })

  });
}
}
