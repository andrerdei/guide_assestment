import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StockPriceService } from './stock-price.service';
import { Observable } from 'rxjs';

describe('StockPriceService', () => {
  let service: StockPriceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StockPriceService]
    });
    service = TestBed.inject(StockPriceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get stock data from API', () => {
    const mockResponse = {
      chart: {
        result: [
          {
            indicators: {
              quote: [
                {
                  open: [1, 2, 3, 4, 5]
                }
              ]
            },
            timestamp: [1610524800, 1610611200, 1610697600, 1610784000, 1610870400]
          }
        ]
      }
    };

    service.getStockData().subscribe((data) => {
      expect(data.length).toBe(5);
      expect(data[0].day).toBe(1);
      expect(data[0].value).toBe(1);
    });

    const req = httpTestingController.expectOne('/api/v8/finance/chart/PETR4.SA');
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });

  it('should handle API error', () => {
    const errorMessage = 'Error fetching stock data';

    service.getStockData().subscribe(
      () => {},
      (error) => {
        expect(error.error).toBe(errorMessage);
      }
    );

    const req = httpTestingController.expectOne('/api/v8/finance/chart/PETR4.SA');
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });

  it('should return chart subject state as an observable', () => {
    const chartSubjectState = service.getChartSubjectState();
    expect(chartSubjectState).toBeTruthy();
    expect(chartSubjectState instanceof Observable).toBe(true);
  });
});
