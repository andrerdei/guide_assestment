import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {StockDataModel} from "../../models/stock-data.model";
import {MatDialog} from "@angular/material/dialog";
import {CheckScreenStatusService} from "../../services/check-screen-status.service";
import {StockPriceService} from "../../services/stock-price.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ChartDialogComponent} from "../chart-dialog/chart-dialog.component";

@Component({
  selector: 'stock-price-table-component',
  templateUrl: './stock-price-table.html',
  styleUrls: ['./stock-price-table.component.scss']
})

export class StockPriceTableComponent implements OnInit, OnDestroy {

  // Private Variables

  private checkScreenSubscription!: Subscription;
  private checkChartSubjectSubscription!: Subscription;

  // Public Variables

  @ViewChild(MatPaginator, {static: true}) public paginator!: MatPaginator;
  public isMobile: boolean = this.checkScreenStatusService.getScreenSizeAtFirstLoad();
  public displayedColumns: string[] = ['day', 'date', 'value', 'variationDay', 'variationFirstDay'];
  public stockData = new MatTableDataSource<StockDataModel>();
  public totalItems = 0;
  public isTableDataLoading = false;
  public isTableDataEmpty = false;

  // Constructor

  constructor(
    private dialog: MatDialog,
    private checkScreenStatusService: CheckScreenStatusService,
    private stockPriceService: StockPriceService
  ) {
  }

  // onInit

  ngOnInit(): void {
    this.getScreenSize();
    this.checkChartSubjectState();
    this.initializeTable();
    this.getStockData();
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

  private checkChartSubjectState(): void {
    this.checkChartSubjectSubscription = this.stockPriceService.getChartSubjectState().subscribe({
      next: (newData) => {
        if (newData)
          this.handleOpenChartDialog();
      },

      error: (error: HttpErrorResponse) => {
        console.error(error?.message);
      }
    });
  }

  private initializeTable(): void {
    this.stockData = new MatTableDataSource<any>([]);
    this.stockData.paginator = this.paginator;
  }

  private getStockData(): void {
    this.isTableDataLoading = true;
    this.isTableDataEmpty = false;

    this.stockPriceService.getStockData().subscribe({
      next: (stockData: StockDataModel[]) => {
        this.stockData = new MatTableDataSource<StockDataModel>(stockData);
        this.stockData.paginator = this.paginator;
        this.isTableDataLoading = false;
        this.totalItems = stockData.length;
      },

      error: (err: HttpErrorResponse) => {
        console.error(err?.message);
        this.isTableDataLoading = false;
        this.isTableDataEmpty = true;
        this.totalItems = 0;
      }
    });
  }

  private handleOpenChartDialog(): void {
    const dialogRef = this.dialog.open(ChartDialogComponent, {
      data: [...this.stockData.filteredData],
      width: '90%',
      maxWidth: '840px',
      maxHeight: '590px',
    });

    dialogRef.afterClosed().subscribe({
      next: () => {
      },

      error: (error: HttpErrorResponse) => {
        console.error(error?.message);
      }
    })
  }

  // OnDestroy

  ngOnDestroy(): void {
    this.checkScreenSubscription.unsubscribe();
    this.checkChartSubjectSubscription.unsubscribe();
  }
}
