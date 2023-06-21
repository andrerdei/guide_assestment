import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";
import {CheckScreenStatusService} from "../../services/check-screen-status/check-screen-status.service";

@Component({
  selector: 'application-footer-component',
  templateUrl: './application-footer.component.html',
  styleUrls: ['./application-footer.component.scss'],
})
export class ApplicationFooterComponent implements OnInit, OnDestroy {

  // Public Class Variables

  @ViewChild('footerRef', {static: true}) footerRef!: ElementRef;
  public checkScreenSubscription!: Subscription;
  public isMobile: boolean = this.checkScreenStatusService.getScreenSizeAtFirstLoad();
  public currentYear = new Date().getFullYear();

  // Constructor

  constructor(private checkScreenStatusService: CheckScreenStatusService) {

  }

  // OnInit

  ngOnInit(): void {
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

  calcWidthConsideringScrollBar(): void {
    const viewportWidth = document.documentElement.clientWidth;
    const windowWidth = document.documentElement.offsetWidth;
    const scrollbarWidth = windowWidth - viewportWidth;

    this.footerRef.nativeElement.style.width = `calc(100% - ${scrollbarWidth}px)`;
  }

  // OnDestroy

  ngOnDestroy(): void {
    this.checkScreenSubscription.unsubscribe();
  }
}
