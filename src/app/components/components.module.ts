import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRadioModule} from "@angular/material/radio";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTabsModule} from "@angular/material/tabs";
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
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatGridListModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatTabsModule
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
