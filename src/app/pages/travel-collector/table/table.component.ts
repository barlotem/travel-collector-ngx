import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Travel } from '../../../@core/models/Travel';
import { TravelService } from '../../../@core/utils/Travel.service';
import { TravelDialogComponent } from '../travel-dialog/travel-dialog.component';

@Component({
  selector: 'ngx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  travelList: Travel[];
  searchTerm: string;

  constructor(private travelService: TravelService, private dialogService: NbDialogService) {
    this.travelList = new Array<Travel>();
    this.searchTerm = "";
   }

  ngOnInit() : void{
    this.travelService.getTravelList().subscribe((result: Travel[])=> {
      this.travelList = result; 

      if (this.travelList == null ) {
        // Get from local storage
        this.travelList = JSON.parse(localStorage.getItem("travelList") || "[]") as Travel[];
      }
    }); 
  }

  OpenDialog(travel: Travel) {
    console.log(travel);
    this.dialogService.open(TravelDialogComponent, {
      context: {
        travel: travel,
      },
    });
  }
}
