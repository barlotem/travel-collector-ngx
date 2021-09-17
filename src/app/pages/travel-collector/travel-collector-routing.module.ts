import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { UploadDataComponent } from './upload-data/upload-data.component';

const routes: Routes = [{
  path: '',
  component: TableComponent,
  children: [
    {
      path: 'table',
      component: TableComponent,
    },
    {
      path: 'upload',
      component: UploadDataComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TravelCollectorRoutingModule {
}


