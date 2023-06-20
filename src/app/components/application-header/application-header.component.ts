import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {CheckScreenStatusService} from "../../services/check-screen-status.service";
import {StockPriceService} from "../../services/stock-price.service";

@Component({
  selector: 'application-header-component',
  templateUrl: './application-header.component.html',
  styleUrls: ['./application-header.component.scss']
})

export class ApplicationHeaderComponent implements OnInit, OnDestroy {

  // Private Variables

  private checkScreenSubscription!: Subscription;

  // Public Variables

  @ViewChild('headerRef', {static: true}) public headerRef!: ElementRef;
  public isMobile: boolean = this.checkScreenStatusService.getScreenSizeAtFirstLoad();

  // Constructor

  constructor(
    private checkScreenStatusService: CheckScreenStatusService,
    private stockPriceService: StockPriceService
  ) {
  }

  // OnInit

  ngOnInit() {
    this.getScreenSize();
    this.calcWidthConsideringScrollBar();
  }

  // Private Methods

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

  private calcWidthConsideringScrollBar(): void {
    const viewportWidth = document.documentElement.clientWidth;
    const windowWidth = document.documentElement.offsetWidth;
    const scrollbarWidth = windowWidth - viewportWidth;

    this.headerRef.nativeElement.style.width = `calc(100% - ${scrollbarWidth}px)`;
  }

  // Public Methods

  public handleChartSubjectEmition(): void {
    this.stockPriceService.updateChartSubjectState(true);
  }

  // OnDestroy

  ngOnDestroy(): void {
    this.checkScreenSubscription.unsubscribe();
  }
}
