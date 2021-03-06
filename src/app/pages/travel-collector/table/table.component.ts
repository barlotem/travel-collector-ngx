import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Travel } from '../../../@core/models/Travel';
import { TravelService } from '../../../@core/utils/Travel.service';
import { TravelDialogComponent } from '../travel-dialog/travel-dialog.component';
import { ChangeDetectorRef, AfterContentChecked} from '@angular/core';

@Component({
  selector: 'ngx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  travelList: Travel[];
  searchTerm: string;
  filteredCount: any;

  constructor(private travelService: TravelService, private dialogService: NbDialogService, private cdref: ChangeDetectorRef) {
    this.travelList = new Array<Travel>();
    this.searchTerm = "";
    this.filteredCount = { count: 0 };
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

  ngAfterContentChecked() {
    this.cdref.detectChanges();
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
