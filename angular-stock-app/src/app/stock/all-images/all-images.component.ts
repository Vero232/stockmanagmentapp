import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StockApiService } from 'src/app/stock-api.service.';

@Component({
  selector: 'app-all-images',
  templateUrl: './all-images.component.html',
  styleUrls: ['./all-images.component.css']
})
export class AllImagesComponent implements OnInit {

  constructor(private service:StockApiService, private router: Router) { }
  @Input() Imageitem:any;

  images: FileList | any = null;

//properties
  imageList$!:Observable<any[]>;
  imageListArray: any [] = [];
  myEvents:any;

  ngOnInit(): void {
    this.getStockItemImages()
  }
  getStockItemImages(){

    this.service.getImages(this.Imageitem).subscribe(response =>{
      this.myEvents = response;
  console.log( this.myEvents)
        this.myEvents.body.forEach( (element: any) => {
              this.imageListArray.push({
                imageUrl: 'data:image/jpg;base64,' + element.imageBytes,
                imageType: element.imageType,
                id: element.id
               })

          })

  
    });
  }


  fileChange(event : any){
    console.log(this.Imageitem)
    this.images = (event.target as HTMLInputElement).files;
        if(this.images){
          for(let i = 0; i < this.images.length; i++){
            if(this.images.item(i)){
                const formData = new FormData();
                formData.append('file', this.images.item(i) as File);
                formData.append('StockItemId',  this.Imageitem);
                formData.append('ImageType', "Primary");
  
                this.service.postImages(formData).subscribe(response  =>{
                  console.log(response)
                  
  
                })
                  
                 var closeModal = document.getElementById('add-edit-modal-close')
                 if(closeModal){
                   closeModal.click();
                 }

          }
        }

      }
    }
  
    otherImages(event : any){
      let files = (event.target as HTMLInputElement).files;
    
    
          if(files){
            for(let i = 0; i < files.length; i++){
              if(files.item(i)){
                  const formData = new FormData();
                  formData.append('file', files.item(i) as File);
                  formData.append('StockItemId', this.Imageitem);
                  formData.append('ImageType', "Other");
    
                  this.service.postImages(formData).subscribe(response  =>{
             
                  })
                  var closeModal = document.getElementById('add-edit-modal-close')
                  if(closeModal){
                    closeModal.click();
                  }
            }
          
          }
    
        }
      }

      delete(item:any){
 
        this.service.deleteImages(item).subscribe(res =>{ })
      
      }
}
