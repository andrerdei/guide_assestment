import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'stock-price',
    pathMatch: 'full'
  },
  {
    path: 'stock-price',
    loadChildren: () => import('./base-modules/stock-price/stock-price.module').then(m => m.StockPriceModule),
  },
  {
    path: '**',
    redirectTo: 'stock-price'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
