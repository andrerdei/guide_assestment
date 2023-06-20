import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StockPriceComponent } from './stock-price.component';

const routes: Routes = [
  { path: '', component: StockPriceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockPriceRoutingModule { }
