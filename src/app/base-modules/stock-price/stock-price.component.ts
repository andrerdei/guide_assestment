import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {CheckScreenStatusService} from "../../services/check-screen-status/check-screen-status.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-stock-price',
  templateUrl: './stock-price.component.html',
  styleUrls: ['./stock-price.component.scss']
})
export class StockPriceComponent implements OnInit, OnDestroy {

  // Private Variables

  checkScreenSubscription!: Subscription;

  // Public Variables

  public isMobile: boolean = this.checkScreenStatusService.getScreenSizeAtFirstLoad();

  // Constructor

  constructor(private checkScreenStatusService: CheckScreenStatusService) {
  }

  // onInit

  ngOnInit(): void {
    this.getScreenSize();
  }

  // Private methods

  private getScreenSize(): void {
    this.checkScreenSubscription = this.checkScreenStatusService.getScreenSize().subscribe({
      next: (isMobile) => {
        this.isMobile = isMobile;
      },

      error: (error: HttpErrorResponse) => {
        console.error(error?.message);
      }
    });
  }

  // OnDestroy

  ngOnDestroy(): void {
    this.checkScreenSubscription.unsubscribe();
  }
}
