import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';
import { TravelService } from '../../@core/utils/Travel.service';
import { ThemeModule } from '../../@theme/theme.module';
import { TravelDialogComponent } from './travel-dialog/travel-dialog.component';
import { SearchPipe } from './search.pipe';
import { TableComponent } from './table/table.component';
import { TravelCollectorRoutingModule } from './travel-collector-routing.module';
import { UploadDataComponent } from './upload-data/upload-data.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ChartModule } from 'angular2-chartjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    TableComponent, 
    SearchPipe, 
    TravelDialogComponent,
    UploadDataComponent, 
    StatisticsComponent],
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    TravelCollectorRoutingModule,
    FormsModule,
    NgxChartsModule,
    ChartModule,
  ],
  providers: [TravelService]
})
export class TravelCollectorModule { }
