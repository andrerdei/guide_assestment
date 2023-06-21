import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ChartDialogComponent} from "./chart-dialog/chart-dialog.component";
import {ApplicationHeaderComponent} from "./application-header/application-header.component";
import {ApplicationFooterComponent} from "./application-footer/application-footer.component";
import {HttpClientModule} from "@angular/common/http";
import {StockPriceTableComponent} from "./stock-price-table/stock-price-table.component";


@NgModule({
  declarations: [
    ChartDialogComponent,
    ApplicationHeaderComponent,
    ApplicationFooterComponent,
    StockPriceTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  exports: [
    ChartDialogComponent,
    ApplicationHeaderComponent,
    ApplicationFooterComponent,
    StockPriceTableComponent
  ]
})
export class ComponentsModule {
}
