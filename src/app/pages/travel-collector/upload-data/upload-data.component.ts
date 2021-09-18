import { Component, OnInit } from '@angular/core';
import { Travel } from '../../../@core/models/Travel';
import { TravelService } from '../../../@core/utils/Travel.service';
import * as XLSX from 'xlsx';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-upload-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.scss']
})
export class UploadDataComponent implements OnInit {

  arrayBuffer:any;
  file:File;
  travelList: Travel[];
  title: string;
  body: string;
  config: any;

  constructor(public travelService: TravelService, private toastrService: NbToastrService) { 
    this.travelList = new Array<Travel>();
  }

  ngOnInit(): void {
  }

  incomingfile(event) {
    this.file = event.target.files[0]; 
  }
  
  RemoveData() {
    localStorage.removeItem("travelList");
  }

   Upload() {

   
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
          this.arrayBuffer = fileReader.result;
          var data = new Uint8Array(this.arrayBuffer);
          var arr = new Array();
          for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
          var bstr = arr.join("");
          var workbook = XLSX.read(bstr, {type:"binary"});
          var first_sheet_name = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[first_sheet_name];
          let jsonObj:Array<any> = XLSX.utils.sheet_to_json(worksheet,{raw:true});

          try{
          for (var i=3; i<jsonObj.length; i++){
            // Make sure there is album_id
            if (jsonObj[i].__EMPTY_12 == null){
              throw 'Not valid';
            }
            this.travelList.push(new Travel(jsonObj[i].__EMPTY_12, this.ExcelDateToJSDate(jsonObj[i].__EMPTY_11), jsonObj[i].__EMPTY_10,jsonObj[i].__EMPTY_9,
              jsonObj[i].__EMPTY_8,jsonObj[i].__EMPTY_7,jsonObj[i].__EMPTY_6,jsonObj[i].__EMPTY_5,jsonObj[i].__EMPTY_4,jsonObj[i].__EMPTY_3,jsonObj[i].__EMPTY_2,jsonObj[i].__EMPTY_1,jsonObj[i].__EMPTY));
          }

          this.travelService.setTravelList(this.travelList);
    
          // Build success toastr 
          this.config = {
            status: 'success',
            destroyByClick: true,
            duration: 2500,
            hasIcon: true,
            position: NbGlobalPhysicalPosition.BOTTOM_LEFT,
            preventDuplicates: true,
          };

          this.title =  'הקובץ עלה בהצלחה';
          this.body = `גש לעמוד הטיולים שלי על מנת לראות את העדכון`;
          
          // Show toastr with message of finish upload
          this.toastrService.show(this.body, this.title, this.config);
        }
        catch(error) {
    
          console.error(error);
    
           // Build success toastr 
           this.config = {
            status: 'danger',
            destroyByClick: true,
            duration: 5000,
            hasIcon: true,
            position: NbGlobalPhysicalPosition.BOTTOM_LEFT,
            preventDuplicates: true,
          };
    
          this.title =  'לא הצליח להעלות';
          this.body = `אנא וודא שהקובץ במבנה תקין`;
    
           // Show toastr with message of finish upload
           this.toastrService.show(this.body, this.title, this.config);
        }    
      }
      fileReader.readAsArrayBuffer(this.file); 
      
  }
  
  ExcelDateToJSDate(serial) {
    var utc_days  = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;                                        
    var date_info = new Date(utc_value * 1000);
  
    var fractional_day = serial - Math.floor(serial) + 0.0000001;
  
    var total_seconds = Math.floor(86400 * fractional_day);
  
    var seconds = total_seconds % 60;
  
    total_seconds -= seconds;
  
    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;
  
    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
  }
}
