import {Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {CheckScreenStatusService} from "../../services/check-screen-status.service";
import {Subscription} from "rxjs";
import {StockPriceComponent} from "../../base-modules/stock-price/stock-price.component";
import {StockDataModel} from "../../models/stock-data.model";
import {Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import 'chartjs-adapter-moment';
Chart.register(...registerables);

@Component({
  selector: 'column-dialog-component',
  templateUrl: './chart-dialog.component.html',
  styleUrls: ['./chart-dialog.component.scss']
})

export class ChartDialogComponent implements OnInit, AfterViewInit, OnDestroy {

  // Private Variables

  private checkScreenSubscription!: Subscription;

  // Public Variables

  public isMobile: boolean = this.checkScreenStatusService.getScreenSizeAtFirstLoad();
  @ViewChild('priceChart', { static: true }) public priceChartRef!: ElementRef;

  // Constructor

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private checkScreenStatusService: CheckScreenStatusService,
    public dialogRef: MatDialogRef<StockPriceComponent>,
  ) {
  }

  // OnInit

  ngOnInit() {
    this.getScreenSize();
  }

  ngAfterViewInit(): void {
    this.initializeChart();
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

  private initializeChart(): void {
    const ctx = this.priceChartRef.nativeElement.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: this.getChartData(),
      options: this.getChartOptions(),
    });
  }

  private getChartData(): ChartData<'line'> {
    const priceData = this.dialogData.map((stockData: StockDataModel) => ({
      x: stockData.day,
      y: stockData.variationFirstDay,
    }));

    return {
      datasets: [
        {
          label: 'Variação de Preço',
          data: priceData,
        },
      ],
    };
  }

  private getChartOptions(): ChartOptions {
    return {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            tooltipFormat: 'MMM D, YYYY',
          },
          title: {
            display: true,
            text: 'Dia',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Variação de Preço',
          },
        },
      },
    };
  }


  // Public Methods

  public handleDialogClose(): void {
    this.dialogRef.close();
  }

  // OnDestroy

  ngOnDestroy(): void {
    this.checkScreenSubscription.unsubscribe();
  }
}
