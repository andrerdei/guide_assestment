import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { StockPriceComponent } from './stock-price.component';
import { StockPriceRoutingModule } from './stock-price-routing.module';
import {StockPriceService} from "../../services/stock-price/stock-price.service";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [StockPriceComponent],
  imports: [
    CommonModule,
    StockPriceRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    ComponentsModule
  ],
  providers: [StockPriceService]
})
export class StockPriceModule { }
