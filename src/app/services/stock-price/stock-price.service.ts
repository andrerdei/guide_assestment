import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StockPriceService {

  // Private Class Variables

  private apiUrl = '/api/v8/finance/chart/PETR4.SA';

  // Public Class Variables

  public chartVisualizationSubject = new BehaviorSubject<boolean>(false);

  // Constructor

  constructor(private http: HttpClient) {
  }

  // Private methods

  private isValidNumber(value: number): boolean {
    return !isNaN(value) && isFinite(value);
  }

  // Public methods

  public getStockData(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        const prices = response.chart.result[0].indicators.quote[0].open;
        const firstPrice = prices[0];

        return prices.map((value: number, index: number) => {
          const variationDay =
            index === 0 || !value
              ? 0
              : ((value - prices[index - 1]) / prices[index - 1]) * 100;

          const variationFirstDay = !value
            ? 0
            : ((value - firstPrice) / firstPrice) * 100;

          return {
            day: index + 1,
            date: response.chart.result[0].timestamp[index + 1] * 1000,
            value: value || 0,
            variationDay: this.isValidNumber(variationDay) ? variationDay : 0,
            variationFirstDay: this.isValidNumber(variationFirstDay) ? variationFirstDay : 0
          };
        });
      })
    );
  }

  public getChartSubjectState(): Observable<boolean> {
    return this.chartVisualizationSubject.asObservable();
  }

  public updateChartSubjectState(newData: boolean): void {
    this.chartVisualizationSubject.next(newData);
  }
}
