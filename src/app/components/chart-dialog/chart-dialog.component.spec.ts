import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { ElementRef } from '@angular/core';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { ChartDialogComponent } from './chart-dialog.component';
import { CheckScreenStatusService } from '../../services/check-screen-status/check-screen-status.service';
import { StockDataModel } from '../../models/stock-data.model';

Chart.register(...registerables);

describe('ChartDialogComponent', () => {
  let component: ChartDialogComponent;
  let fixture: ComponentFixture<ChartDialogComponent>;
  let mockDialogRef: Partial<MatDialogRef<ChartDialogComponent>>;
  let mockCheckScreenStatusService: Partial<CheckScreenStatusService>;
  let mockElementRef: Partial<ElementRef>;

  const mockDialogData: StockDataModel[] = [
    { day: 1, date: 1623349200000, value: 10, variationDay: 5, variationFirstDay: 0 },
    { day: 2, date: 1623435600000, value: 12, variationDay: 20, variationFirstDay: 20 },
    // Add more mock data as needed
  ];

  beforeEach(async () => {
    mockDialogRef = {
      close: jasmine.createSpy('close')
    };

    mockCheckScreenStatusService = {
      getScreenSizeAtFirstLoad: () => true,
      getScreenSize: () => of(true)
    };

    mockElementRef = {
      nativeElement: document.createElement('canvas')
    };

    await TestBed.configureTestingModule({
      declarations: [ChartDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: CheckScreenStatusService, useValue: mockCheckScreenStatusService },
        { provide: ElementRef, useValue: mockElementRef }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct screen size', () => {
    expect(component.isMobile).toBe(true);
  });

  it('should subscribe to screen size changes', () => {
    // @ts-ignore
    spyOn(mockCheckScreenStatusService, 'getScreenSize').and.returnValue(of(false));
    component.ngOnInit();
    expect(component.isMobile).toBe(false);
  });

  it('should call handleDialogClose method when dialog is closed', () => {
    const closeButton = fixture.debugElement.query(By.css('.close-button'));
    closeButton.triggerEventHandler('click', null);
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should unsubscribe from the screen size changes on component destroy', () => {
    spyOn(component['checkScreenSubscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['checkScreenSubscription'].unsubscribe).toHaveBeenCalled();
  });

  it('should get the chart data', () => {
    const expectedChartData: ChartData<'line'> = {
      datasets: [
        {
          label: 'Variação de Preço',
          data: [
            { x: 1, y: 0 },
            { x: 2, y: 20 },
            // Add more expected data as needed
          ]
        }
      ]
    };

    const chartData = component.getChartData();
    expect(chartData).toEqual(expectedChartData);
  });

  it('should get the chart options', () => {
    const expectedChartOptions: ChartOptions = {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            tooltipFormat: 'MMM D, YYYY'
          },
          title: {
            display: true,
            text: 'Dia'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Variação de Preço'
          }
        }
      }
    };

    const chartOptions = component['getChartOptions']();
    expect(chartOptions).toEqual(expectedChartOptions);
  });
});
