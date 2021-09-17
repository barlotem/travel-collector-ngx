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

@NgModule({
  declarations: [TableComponent, SearchPipe, TravelDialogComponent],
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
    FormsModule
  ],
  providers: [TravelService]
})
export class TravelCollectorModule { }
